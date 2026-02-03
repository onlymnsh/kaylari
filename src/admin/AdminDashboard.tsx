import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  Video, 
  FolderOpen, 
  Settings,
  Upload,
  Trash2,
  Plus,
  X,
  Lock,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useDropzone } from 'react-dropzone';
import Navigation from '@/sections/Navigation';

type Tab = 'dashboard' | 'images' | 'videos' | 'collections' | 'settings';

// Admin credentials (in production, this should be server-side)
const ADMIN_PASSWORD = 'kaylari2024';
const AUTH_KEY = 'kaylari-admin-auth';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const { content } = useAdmin();

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setPassword('');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A0A0F] via-[#2D1219] to-[#1A0A0F] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-lg border border-[#D4AF37]/30 rounded-2xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="font-hindi text-4xl text-[#D4AF37]">कायलारी</span>
            <h1 className="text-2xl font-['Playfair_Display'] font-bold text-white mt-2">
              Admin Login
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Enter password to access dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] text-[#1A0A0F] font-medium rounded-lg hover:bg-[#F4D03F] transition-colors"
            >
              Login
            </button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              &larr; Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'images' as Tab, label: 'Images', icon: Image },
    { id: 'videos' as Tab, label: 'Videos', icon: Video },
    { id: 'collections' as Tab, label: 'Collections', icon: FolderOpen },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navigation isAdmin />
      
      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 admin-sidebar overflow-y-auto">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#D4AF37] text-[#1A0A0F]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {activeTab === 'dashboard' && <DashboardTab content={content} />}
          {activeTab === 'images' && <ImagesTab />}
          {activeTab === 'videos' && <VideosTab />}
          {activeTab === 'collections' && <CollectionsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ content }: { content: { images: any[]; videos: any[]; collections: any[] } }) {
  const stats = [
    { label: 'Total Images', value: content.images.length, icon: Image, color: 'bg-blue-500' },
    { label: 'Total Videos', value: content.videos.length, icon: Video, color: 'bg-purple-500' },
    { label: 'Collections', value: content.collections.length, icon: FolderOpen, color: 'bg-green-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A0A0F] mb-8">
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-[#D4AF37]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#1A0A0F]/60 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#1A0A0F]">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#D4AF37]/10">
        <h2 className="text-xl font-['Playfair_Display'] font-semibold text-[#1A0A0F] mb-4">
          Welcome to Kaylari Admin
        </h2>
        <p className="text-[#1A0A0F]/60">
          Use the sidebar to manage your website content. Upload images, add videos, and organize your collections.
        </p>
      </div>
    </div>
  );
}

// Images Tab
function ImagesTab() {
  const { content, addImage, deleteImage } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState({
    title: '',
    category: '',
    description: '',
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleUpload = () => {
    if (preview && imageData.title && imageData.category) {
      addImage({
        src: preview,
        title: imageData.title,
        category: imageData.category,
        description: imageData.description,
      });
      setPreview(null);
      setImageData({ title: '', category: '', description: '' });
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A0A0F]">
          Images
        </h1>
        <button
          onClick={() => setIsUploading(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1029] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-['Playfair_Display'] font-semibold">Upload Image</h2>
              <button onClick={() => setIsUploading(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {!preview ? (
              <div
                {...getRootProps()}
                className={`dropzone rounded-xl p-12 text-center cursor-pointer ${
                  isDragActive ? 'dragover' : ''
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 mx-auto mb-4 text-[#D4AF37]" />
                <p className="text-[#1A0A0F]/70 mb-2">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                </p>
                <p className="text-sm text-[#1A0A0F]/40">or click to select</p>
              </div>
            ) : (
              <div className="space-y-4">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                <input
                  type="text"
                  placeholder="Image Title"
                  value={imageData.title}
                  onChange={(e) => setImageData({ ...imageData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={imageData.category}
                  onChange={(e) => setImageData({ ...imageData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={imageData.description}
                  onChange={(e) => setImageData({ ...imageData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538] resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreview(null)}
                    className="flex-1 py-2 border border-[#1A0A0F]/20 rounded-lg hover:bg-[#1A0A0F]/5"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={handleUpload}
                    className="flex-1 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1029]"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.images.map((image) => (
          <div key={image.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={image.src}
              alt={image.title}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => deleteImage(image.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="font-medium text-sm truncate">{image.title}</p>
              <p className="text-xs text-[#1A0A0F]/60">{image.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Videos Tab
function VideosTab() {
  const { content, addVideo, deleteVideo } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: '',
    category: '',
    description: '',
    thumbnail: '',
    src: '',
  });

  const handleUpload = () => {
    if (videoData.title && videoData.category && videoData.src) {
      addVideo({
        ...videoData,
        thumbnail: videoData.thumbnail || videoData.src,
      });
      setVideoData({ title: '', category: '', description: '', thumbnail: '', src: '' });
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A0A0F]">
          Videos
        </h1>
        <button
          onClick={() => setIsUploading(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1029] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-['Playfair_Display'] font-semibold">Add Video</h2>
              <button onClick={() => setIsUploading(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Video Title"
                value={videoData.title}
                onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
              />
              <input
                type="text"
                placeholder="Category"
                value={videoData.category}
                onChange={(e) => setVideoData({ ...videoData, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
              />
              <input
                type="text"
                placeholder="Video URL (YouTube embed or direct link)"
                value={videoData.src}
                onChange={(e) => setVideoData({ ...videoData, src: e.target.value })}
                className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
              />
              <input
                type="text"
                placeholder="Thumbnail URL (optional)"
                value={videoData.thumbnail}
                onChange={(e) => setVideoData({ ...videoData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
              />
              <textarea
                placeholder="Description (optional)"
                value={videoData.description}
                onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538] resize-none"
                rows={3}
              />
              <button
                onClick={handleUpload}
                className="w-full py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1029]"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos List */}
      {content.videos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl">
          <Video className="w-12 h-12 mx-auto mb-4 text-[#1A0A0F]/20" />
          <p className="text-[#1A0A0F]/60">No videos added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-video bg-[#1A0A0F]/10 flex items-center justify-center">
                <Video className="w-12 h-12 text-[#1A0A0F]/20" />
              </div>
              <div className="p-4 flex justify-between items-start">
                <div>
                  <p className="font-medium">{video.title}</p>
                  <p className="text-sm text-[#1A0A0F]/60">{video.category}</p>
                </div>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Collections Tab
function CollectionsTab() {
  const { content } = useAdmin();

  return (
    <div>
      <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A0A0F] mb-8">
        Collections
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full aspect-[3/2] object-cover"
            />
            <div className="p-4">
              <h3 className="font-['Playfair_Display'] font-semibold text-lg">{collection.name}</h3>
              <p className="text-sm text-[#1A0A0F]/60 mt-1">{collection.description}</p>
              <p className="text-sm text-[#8B1538] mt-2">{collection.itemCount} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  return (
    <div>
      <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A0A0F] mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg">
        <h2 className="text-xl font-['Playfair_Display'] font-semibold mb-4">Site Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#1A0A0F]/60 mb-1">Site Name</label>
            <input
              type="text"
              defaultValue="Kaylari"
              className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-[#1A0A0F]/60 mb-1">Contact Email</label>
            <input
              type="email"
              defaultValue="hello@kaylari.com"
              className="w-full px-4 py-2 border border-[#1A0A0F]/20 rounded-lg focus:outline-none focus:border-[#8B1538]"
            />
          </div>
          <button className="px-6 py-2 bg-[#8B1538] text-white rounded-lg hover:bg-[#6B1029] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
