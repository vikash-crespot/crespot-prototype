import { useState } from 'react';

function App() {
  const [step, setStep] = useState(1); // 1 = email/name, 2 = URL, 3 = profile
  const [formData, setFormData] = useState({ email: '', name: '', url: '' });
  const [wizardStep, setWizardStep] = useState(0);
  const [showWizard, setShowWizard] = useState(false);
  const [profileData, setProfileData] = useState({
    tagline: 'Creative Spark',
    bio: 'From remote village stories to big dreams...',
    interests: ['Art', 'Writing', 'Music'],
    work: ['IMDb Link', 'Wikipedia Link'],
    awards: ['Best Storyteller 2025'],
    mediaImages: ['https://images.unsplash.com/photo-1557683316-973673baf926?w=500'],
    mediaVideos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    pageManager: 'Self',
    visitorCount: 0,
    completion: 30
  });
  const [activeTab, setActiveTab] = useState('images');
  const [showShare, setShowShare] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.email) return alert('Email required');
      if (!formData.name) return alert('Name required');
      setStep(2);
    } else if (step === 2) {
      if (!formData.url) return alert('Custom URL required');
      setStep(3);
      setShowWizard(true);
      alert('Welcome to CreSpot!');
    }
  };

  const wizardSteps = [
    'Add tagline (suggestion: Connect Create Shine)',
    'Add bio (share your creative journey)',
    'Add interests (e.g., Art, Writing, Music)',
    'Add work (link to IMDb or portfolio)',
    'Add media (upload images or embed videos)'
  ];

  const handleWizardNext = () => {
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      setShowWizard(false);
    }
    setProfileData((prev) => ({ ...prev, completion: Math.min(prev.completion + 10, 100) }));
  };

  const handleShare = () => setShowShare(true);

  const closeShare = () => setShowShare(false);

  const adminProfiles = [
    { id: 1, name: 'Kid Artist', url: 'kidartist', status: 'Pending' },
    { id: 2, name: 'Remote Writer', url: 'remotewriter', status: 'Active' },
    { id: 3, name: 'Senior Painter', url: 'seniorpainter', status: 'Active' },
    { id: 4, name: 'Professional Director', url: 'prodirector', status: 'Approved' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#001F3F', color: 'white', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#001F3F', borderBottom: '1px solid rgba(255,215,0,0.3)', padding: '1rem', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Final Logo */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#001F3F" />
              <path d="M10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20" stroke="white" strokeWidth="4" strokeLinecap="round" transform="rotate(30 20 20)" />
              <circle cx="25" cy="15" r="3" fill="#FFD700" />
              <text x="5" y="35" fill="white" fontSize="8" fontWeight="bold">CreSpot</text>
            </svg>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>CreSpot</h1>
              <p style={{ fontSize: '0.75rem', color: '#FFD700', margin: 0 }}>Connect Create Shine</p>
            </div>
          </div>
          <button onClick={() => setShowAdmin(!showAdmin)} style={{ background: 'none', border: 'none', color: '#FFD700', cursor: 'pointer' }}>
            {showAdmin ? 'Hide Admin' : 'Admin'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ paddingTop: '80px', maxWidth: '900px', margin: '0 auto' }}>
        {showAdmin ? (
          <div>
            <h3 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '1rem' }}>Admin Moderation Panel</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>URL</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProfiles.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
                    <td style={{ padding: '0.75rem' }}>{p.name}</td>
                    <td style={{ padding: '0.75rem' }}>crespot.in/{p.url}</td>
                    <td style={{ padding: '0.75rem' }}>{p.status}</td>
                    <td style={{ padding: '0.75rem', display: 'flex', gap: '1rem' }}>
                      <button style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer' }}>Approve</button>
                      <button style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Reject</button>
                      <button style={{ color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer' }}>Flag</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : step < 3 ? (
          // Onboarding
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255,215,0,0.3)' }}>
            <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '2rem' }}>
              {step === 1 ? 'Join CreSpot' : 'Claim Your Spot'}
            </h2>

            {step === 1 && (
              <>
                <input
                  name="email"
                  type="email"
                  placeholder="Email or Mobile"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem', marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '0.5rem', color: 'white' }}
                />
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '1rem', marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '0.5rem', color: 'white' }}
                />
                <button onClick={handleNext} style={{ width: '100%', backgroundColor: '#FFD700', color: '#001F3F', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none' }}>
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ padding: '1rem', color: '#aaa' }}>crespot.in/</span>
                  <input
                    name="url"
                    placeholder="yourname"
                    value={formData.url}
                    onChange={handleChange}
                    style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', color: 'white', border: 'none', outline: 'none' }}
                  />
                </div>
                <button onClick={handleNext} style={{ width: '100%', backgroundColor: '#FFD700', color: '#001F3F', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none' }}>
                  Claim & Create Profile
                </button>
              </>
            )}
          </div>
        ) : (
          // Profile Page
          <div>
            {showWizard && (
              <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
                  <h3 style={{ color: '#FFD700', fontSize: '1.5rem' }}>AI Profile Wizard</h3>
                  <p style={{ margin: '1rem 0', color: '#ccc' }}>Step {wizardStep + 1}: {wizardSteps[wizardStep]}</p>
                  <button onClick={handleWizardNext} style={{ width: '100%', backgroundColor: '#FFD700', color: '#001F3F', padding: '0.8rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    Next Step
                  </button>
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '120px', height: '120px', margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', border: '4px solid #FFD700' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h1 style={{ fontSize: '2.25rem' }}>{formData.name || 'Creative User'}</h1>
              <p style={{ fontSize: '1.5rem', color: '#FFD700' }}>{profileData.tagline}</p>
              <p style={{ color: '#aaa' }}>crespot.in/{formData.url || 'yourname'}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', height: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#FFD700', height: '100%', width: profileData.completion + '%', transition: 'width 0.5s' }} />
              </div>
              <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#aaa' }}>Profile {profileData.completion}% Complete</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.5rem', textAlign: 'center' }}>Bio</h3>
              <p style={{ textAlign: 'center', color: '#ccc' }}>{profileData.bio}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.5rem', textAlign: 'center' }}>Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                {profileData.interests.map((item, i) => (
                  <span key={i} style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '9999px', border: '1px solid rgba(255,215,0,0.3)', color: '#ccc' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#FFD700', fontSize: '1.5rem', textAlign: 'center' }}>Media Gallery</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <button onClick={() => setActiveTab('images')} style={{ backgroundColor: activeTab === 'images' ? '#FFD700' : 'transparent', color: activeTab === 'images' ? '#001F3F' : 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,215,0,0.3)' }}>
                  Images
                </button>
                <button onClick={() => setActiveTab('videos')} style={{ backgroundColor: activeTab === 'videos' ? '#FFD700' : 'transparent', color: activeTab === 'videos' ? '#001F3F' : 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,215,0,0.3)' }}>
                  Videos
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {activeTab === 'images' && profileData.mediaImages.map((url, i) => (
                  <img key={i} src={url} alt="Media" style={{ borderRadius: '0.75rem', width: '100%', height: '200px', objectFit: 'cover' }} />
                ))}
                {activeTab === 'videos' && profileData.mediaVideos.map((url, i) => (
                  <iframe key={i} src={url} style={{ borderRadius: '0.75rem', width: '100%', height: '200px' }} allowFullScreen />
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button style={{ backgroundColor: '#FFD700', color: '#001F3F', padding: '1rem 3rem', borderRadius: '9999px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                Click for Work Collaborations
              </button>
            </div>

            <div style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem' }}>
              Managed by: {profileData.pageManager} | Visitors: {profileData.visitorCount}
            </div>

            <button onClick={handleShare} style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: '#FFD700', color: '#001F3F', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer' }}>
              Share
            </button>

            {showShare && (
              <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
                  <h3 style={{ color: '#FFD700', marginBottom: '1rem' }}>Share Your CreSpot</h3>
                  <p style={{ marginBottom: '1.5rem', color: '#ccc' }}>Copy link: crespot.in/{formData.url}</p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <button style={{ backgroundColor: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none' }}>WhatsApp</button>
                    <button style={{ backgroundColor: '#1DA1F2', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none' }}>Twitter</button>
                  </div>
                  <button onClick={closeShare} style={{ width: '100%', backgroundColor: '#FFD700', color: '#001F3F', padding: '0.8rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
