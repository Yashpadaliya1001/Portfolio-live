import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Instagram, TrendingUp, Sparkles, BarChart3, ArrowRight, Menu, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockContactSubmission, profileData, metrics, mainProjects, experiences, services, credentials } from '../mock';
import { trackButtonClick, trackFormSubmission, trackSectionView } from '../utils/analytics';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${profileData.name} - ${profileData.role}`;
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    trackFormSubmission('contact_form', contactForm);
    
    try {
      const response = await mockContactSubmission(contactForm);
      if (response.success) {
        toast.success(response.message);
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCtaClick = (ctaName, location) => {
    trackButtonClick(ctaName, location);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      TrendingUp: TrendingUp,
      Sparkles: Sparkles,
      BarChart3: BarChart3,
    };
    return icons[iconName] || TrendingUp;
  };

  return (
    <div className="App">
      {/* Navigation Header */}
      <header className="navigation-header">
        <a href="#hero" className="navigation-logo">
          {profileData.name}
        </a>
        
        <nav className="navigation-menu">
          <a href="#about" className="navigation-link">About</a>
          <a href="#projects" className="navigation-link">Projects</a>
          <a href="#services" className="navigation-link">Services</a>
          <a href="#contact" className="navigation-link">Contact</a>
        </nav>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
          padding: '24px 16px',
          zIndex: 99,
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button onClick={() => scrollToSection('about')} className="navigation-link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>About</button>
            <button onClick={() => scrollToSection('projects')} className="navigation-link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Projects</button>
            <button onClick={() => scrollToSection('services')} className="navigation-link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Services</button>
            <button onClick={() => scrollToSection('contact')} className="navigation-link" style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Contact</button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="section-padding" style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-two-column" style={{ gridTemplateColumns: '1fr', gap: '40px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <div>
              <div style={{ marginBottom: '32px' }}>
                <img 
                  src="https://customer-assets.emergentagent.com/job_data-driven-growth-1/artifacts/o7mcxrse_IMG_4830.jpeg"
                  alt="Yash Padaliya"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto',
                    border: '4px solid var(--accent-blue)',
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
                  }}
                />
              </div>
              <h1 className="hero-large" style={{ marginBottom: '24px' }}>
                Customer & Trading Manager at{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Sainsbury's
                </span>
                {' '}delivering operational excellence & scalable AI-backed systems
              </h1>
              <p className="hero-medium" style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>
                "Bridging Retail Strategy, Data Insight & AI-Driven Growth."
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    handleCtaClick('work_with_me', 'hero');
                    scrollToSection('contact');
                  }}
                >
                  Work With Me
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    handleCtaClick('view_case_studies', 'hero');
                    scrollToSection('projects');
                  }}
                >
                  View Projects
                </button>
              </div>
              <div style={{ 
                marginTop: '64px', 
                paddingTop: '32px', 
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontSize: '13px',
                color: 'var(--text-secondary)',
              }}>
                <span style={{ color: 'var(--accent-blue)' }}>Sainsbury's</span>
                <span>•</span>
                <span>University of East London</span>
                <span>•</span>
                <span style={{ color: 'var(--accent-green)' }}>AI Review System</span>
                <span>•</span>
                <span>Money4YOU</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Snapshot Section */}
      <section className="section-padding-small" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-four-column">
            {metrics.map((metric, index) => {
              const colors = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-green)', 'var(--accent-orange)'];
              return (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    margin: '0 auto 16px',
                    width: '60px',
                    height: '3px',
                    background: colors[index],
                    boxShadow: `0 0 10px ${colors[index]}`,
                  }}></div>
                  <h3 className="heading-3" style={{ marginBottom: '12px' }}>{metric.title}</h3>
                  <p className="body-small">{metric.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="grid-two-column" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1590097521871-03f076644314"
                alt="Professional workspace with laptop and notes"
                style={{ width: '100%', height: '500px', objectFit: 'cover', border: '2px solid var(--accent-blue)40' }}
              />
            </div>
            <div>
              <h2 className="heading-1" style={{ marginBottom: '24px' }}>
                Strategic. Commercially Aware. Growth Focused.
              </h2>
              <div className="gold-divider"></div>
              <div className="body-large" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '20px' }}>
                  As a Customer & Trading Manager at Sainsbury's, I drive operational excellence across high-volume retail environments while leveraging data-driven strategies to maximize commercial performance.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  My journey began with the Retail Trainee Manager Programme, where I developed deep expertise in team leadership, KPI management, and merchandising optimization. With an MSc in International Business Management from the University of East London, I combine academic rigor with practical execution.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  Beyond retail operations, I've expanded into AI automation, building intelligent review systems that help local businesses amplify their digital presence and drive trust-based conversions. My background spans recruitment, financial analysis (including DCF modelling through JPMorgan simulations), data analytics (Microsoft Learn), and lean inventory management.
                </p>
                <p style={{ marginBottom: '20px' }}>
                  I also contribute as a volunteer at Money4YOU, supporting impact measurement and financial planning initiatives.
                </p>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  "I build systems that convert strategy into measurable performance."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
            <h2 className="heading-1" style={{ marginBottom: '16px' }}>
              Featured <span style={{ color: 'var(--accent-blue)' }}>Projects</span>
            </h2>
            <div style={{ 
              margin: '0 auto',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
            }}></div>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '24px' }}>
              Strategic solutions delivering measurable impact through AI automation and social media growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '48px', marginBottom: '80px' }}>
            {mainProjects.map((project) => (
              <div 
                key={project.id} 
                className="hover-lift"
                style={{
                  background: 'var(--bg-card)',
                  border: `2px solid ${project.accent}`,
                  padding: '40px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: `radial-gradient(circle, ${project.accent}30 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}></div>
                
                <img src={project.image} alt={project.title} style={{ 
                  width: '100%', 
                  height: '240px', 
                  objectFit: 'cover',
                  marginBottom: '24px',
                  border: `1px solid ${project.accent}40`,
                }} />
                
                <span className="body-small" style={{ fontWeight: 600, color: project.accent }}>
                  {project.category}
                </span>
                <h3 className="heading-2" style={{ margin: '12px 0 24px' }}>{project.title}</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <p className="body-small" style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-orange)' }}>
                    Challenge:
                  </p>
                  <p className="body-regular" style={{ color: 'var(--text-secondary)' }}>{project.problem}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p className="body-small" style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-blue)' }}>
                    Action:
                  </p>
                  <p className="body-regular" style={{ color: 'var(--text-secondary)' }}>{project.solution}</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <p className="body-small" style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-green)' }}>
                    Result:
                  </p>
                  <p className="body-regular" style={{ color: 'var(--text-secondary)' }}>{project.outcome}</p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${project.accent}40` }}>
                  <p className="body-small" style={{ fontWeight: 600, marginBottom: '12px' }}>Tools Used:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tools.map((tool, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          padding: '6px 14px',
                          background: `${project.accent}20`,
                          fontSize: '12px',
                          color: project.accent,
                          border: `1px solid ${project.accent}40`,
                          fontWeight: 500,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
            <h2 className="heading-1" style={{ marginBottom: '16px' }}>
              Professional <span style={{ color: 'var(--accent-purple)' }}>Experience</span>
            </h2>
            <div style={{ 
              margin: '0 auto',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-pink))',
            }}></div>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '24px' }}>
              Building expertise across retail operations, financial analysis, and community impact.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            {experiences.map((exp) => (
              <div 
                key={exp.id}
                className="hover-lift"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${exp.accent}40`,
                  borderLeft: `4px solid ${exp.accent}`,
                  overflow: 'hidden',
                }}
              >
                {exp.image && (
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderBottom: `1px solid ${exp.accent}40`,
                    }}
                  />
                )}
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <h3 className="heading-3" style={{ marginBottom: '8px' }}>{exp.title}</h3>
                      <p className="body-regular" style={{ color: exp.accent, fontWeight: 600 }}>
                        {exp.organization}
                      </p>
                    </div>
                    <span className="body-small" style={{ 
                      color: 'var(--text-meta)',
                      padding: '6px 12px',
                      background: 'var(--bg-subtle)',
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="body-regular" style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                        <CheckCircle2 size={16} style={{ color: exp.accent, marginTop: '4px', flexShrink: 0 }} />
                        <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
            <h2 className="heading-1" style={{ marginBottom: '16px' }}>
              <span style={{ color: 'var(--accent-green)' }}>Services</span>
            </h2>
            <div style={{ 
              margin: '0 auto',
              width: '80px',
              height: '3px',
              background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue))',
            }}></div>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '24px' }}>
              Strategic consulting services that drive measurable business outcomes.
            </p>
          </div>

          <div className="grid-three-column">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <div 
                  key={service.id} 
                  className="hover-lift"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${service.accent}40`,
                    padding: '40px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = service.accent;
                    e.currentTarget.style.boxShadow = `0 0 30px ${service.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${service.accent}40`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: `${service.accent}20`,
                    border: `2px solid ${service.accent}`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}>
                    <IconComponent size={32} color={service.accent} />
                  </div>
                  <h3 className="heading-3" style={{ marginBottom: '16px' }}>{service.title}</h3>
                  <p className="body-regular" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    {service.description}
                  </p>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      handleCtaClick(`service_${service.id}`, 'services');
                      scrollToSection('contact');
                    }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '12px 24px',
                      minWidth: 'auto',
                      height: 'auto',
                      fontSize: '13px',
                      borderColor: service.accent,
                      color: service.accent,
                    }}
                  >
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding-small" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="heading-2" style={{ marginBottom: '40px' }}>
              Trusted <span style={{ color: 'var(--accent-yellow)' }}>Professional</span> Profile
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '32px',
              alignItems: 'center',
            }}>
              {credentials.map((cred, index) => {
                const colors = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-green)', 'var(--accent-orange)'];
                return (
                  <div key={index} style={{ padding: '24px 16px', border: `1px solid ${colors[index]}40`, background: 'var(--bg-card)' }}>
                    <p className="body-regular" style={{ fontWeight: 600, color: colors[index] }}>
                      {cred}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="grid-two-column" style={{ maxWidth: '1200px', margin: '0 auto', gap: '80px' }}>
            <div>
              <h2 className="heading-1" style={{ marginBottom: '24px' }}>
                Let's Build{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Scalable Performance
                </span>.
              </h2>
              <div style={{ 
                margin: '0',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))',
              }}></div>
              <p className="body-large" style={{ color: 'var(--text-secondary)', margin: '24px 0 40px' }}>
                If you're looking for strategic retail leadership, AI-powered growth systems, or data-backed decision support — let's connect.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a 
                  href={`tel:${profileData.phone}`}
                  className="body-regular hover-lift"
                  onClick={() => handleCtaClick('phone_call', 'contact')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--accent-blue)40',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)40';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--accent-blue)20',
                    border: '1px solid var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Phone size={20} color="var(--accent-blue)" />
                  </div>
                  <span>{profileData.phone}</span>
                </a>

                <a 
                  href={`mailto:${profileData.email}`}
                  className="body-regular hover-lift"
                  onClick={() => handleCtaClick('email', 'contact')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--accent-green)40',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)40';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--accent-green)20',
                    border: '1px solid var(--accent-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Mail size={20} color="var(--accent-green)" />
                  </div>
                  <span>{profileData.email}</span>
                </a>

                <a 
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-regular hover-lift"
                  onClick={() => handleCtaClick('linkedin', 'contact')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--accent-purple)40',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-purple)40';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--accent-purple)20',
                    border: '1px solid var(--accent-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Linkedin size={20} color="var(--accent-purple)" />
                  </div>
                  <span>Connect on LinkedIn</span>
                </a>

                <a 
                  href={profileData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-regular hover-lift"
                  onClick={() => handleCtaClick('instagram', 'contact')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '20px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--accent-pink)40',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-pink)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-pink)40';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'var(--accent-pink)20',
                    border: '1px solid var(--accent-pink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Instagram size={20} color="var(--accent-pink)" />
                  </div>
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>

            <div>
              <div style={{ 
                background: 'var(--bg-card)',
                border: '1px solid var(--accent-blue)40',
                padding: '40px',
              }}>
                <h3 className="heading-3" style={{ marginBottom: '24px', color: 'var(--accent-blue)' }}>
                  Send a Message
                </h3>
                <form onSubmit={handleContactSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    <label className="body-small" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '0px',
                        fontSize: '14px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label className="body-small" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '0px',
                        fontSize: '14px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label className="body-small" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '0px',
                        fontSize: '14px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        resize: 'vertical',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--bg-secondary)', 
        padding: '48px 0', 
        borderTop: '1px solid var(--border-light)' 
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <p className="body-regular" style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--accent-blue)' }}>
                {profileData.name}
              </p>
              <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                {profileData.location}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a 
                href={`mailto:${profileData.email}`} 
                className="body-small"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-green)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {profileData.email}
              </a>
              <a 
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-purple)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-pink)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div style={{ 
            marginTop: '32px', 
            paddingTop: '32px', 
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
          }}>
            <p className="body-small" style={{ color: 'var(--text-light)' }}>
              © {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Button */}
      <div className="sticky-cta hidden md:block">
        <button 
          className="btn-primary"
          onClick={() => {
            handleCtaClick('sticky_cta', 'fixed_button');
            scrollToSection('contact');
          }}
        >
          Get In Touch
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
