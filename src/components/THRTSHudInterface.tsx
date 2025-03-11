import { useState, useEffect } from 'react';
import { 
  Triangle, 
  Activity, 
  Music,
  Terminal, 
  ChevronRight,
  BarChart,
  Globe
} from 'lucide-react';

// Technical readout component
const TechnicalReadout = ({ label, value, trend = 0 }: { label: string; value: string; trend?: number }) => (
  <div className="flex items-center space-x-2 text-xs font-mono border-l-2 border-cyan-500/20 pl-2 py-1">
    <Activity className="w-3 h-3 text-cyan-500/50" />
    <span className="opacity-70">{label}</span>
    <span className={`ml-auto ${trend > 0 ? 'text-cyan-400' : trend < 0 ? 'text-red-400' : 'text-cyan-500/70'}`}>
      {value}
      {trend !== 0 && 
        <span className="ml-1">{trend > 0 ? '↑' : '↓'}{Math.abs(trend)}</span>
      }
    </span>
  </div>
);

// Audio monitoring panel
const AudioMonitorPanel = ({ index }: { index: number }) => (
  <div className="border border-cyan-500/20 aspect-[5/3] relative overflow-hidden bg-black/30 backdrop-blur-sm">
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Grid lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`grid-${i}`}
            x1="0" 
            y1={i * 10} 
            x2="200" 
            y2={i * 10}
            stroke="cyan"
            strokeOpacity="0.1"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Waveform based on index */}
        {index === 1 && (
          <path
            d="M 0,50 C 50,30 100,70 150,40 S 200,60 200,50"
            fill="none"
            stroke="rgba(0, 255, 255, 0.7)"
            strokeWidth="1.5"
          />
        )}
        {index === 2 && (
          <path
            d="M 0,50 L 40,50 L 50,20 L 60,50 L 100,50 L 120,80 L 140,50 L 160,30 L 200,50"
            fill="none"
            stroke="rgba(0, 255, 255, 0.7)"
            strokeWidth="1.5"
          />
        )}
        {index === 3 && (
          <path
            d="M 0,70 Q 50,20 100,70 T 200,50"
            fill="none"
            stroke="rgba(0, 255, 255, 0.7)"
            strokeWidth="1.5"
          />
        )}
        {index === 4 && (
          <>
            <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
            <path
              d="M 0,50 C 30,45 60,55 90,40 S 150,60 200,50"
              fill="none"
              stroke="rgba(0, 255, 255, 0.7)"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
    
    <div className="absolute top-1 left-1 text-[0.6rem] font-mono text-cyan-500/80">
      TVE {index}/4
    </div>
    <div className="absolute bottom-4 w-full text-center text-xl font-mono">
      00
    </div>
    <div className="absolute bottom-1 w-full text-center text-[0.6rem] font-mono text-cyan-500/80">
      24556 DR
    </div>
  </div>
);

// Section content components
const StudioContent = () => (
  <div className="space-y-6">
    {/* Monitoring panels grid */}
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map(index => (
        <AudioMonitorPanel key={index} index={index} />
      ))}
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">FACILITY_STATUS</h4>
        <div className="space-y-2">
          <TechnicalReadout label="ACOUSTIC_TREATMENT" value="CALIBRATED" />
          <TechnicalReadout label="MONITORING_SYSTEM" value="QUAD_AMP" trend={2} />
          <TechnicalReadout label="SIGNAL_PATH" value="ANALOG/DIGITAL" />
          <TechnicalReadout label="CONVERSION" value="32BIT/192KHZ" />
        </div>
      </div>
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">CURRENT_SESSION</h4>
        <div className="space-y-2">
          <TechnicalReadout label="PROJECT_ID" value="TS-247" />
          <TechnicalReadout label="SESSION_TIME" value="14:23:47" trend={-1} />
          <TechnicalReadout label="TRACK_COUNT" value="32" />
          <TechnicalReadout label="CPU_USAGE" value="42%" />
        </div>
      </div>
    </div>
  </div>
);

const AppContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">LEARNING_MODULE</h4>
        <div className="space-y-2">
          <TechnicalReadout label="CURRENT_MODULE" value="SIGNAL_FLOW_ADV" />
          <TechnicalReadout label="COMPLETION" value="68%" trend={4} />
          <TechnicalReadout label="ACCURACY" value="94%" trend={2} />
          <TechnicalReadout label="TIME_INVESTED" value="13.5_HOURS" />
        </div>
      </div>
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">SYSTEM_METRICS</h4>
        <div className="space-y-2">
          <TechnicalReadout label="ACTIVE_USERS" value="1,247" trend={12} />
          <TechnicalReadout label="SERVER_LOAD" value="47%" trend={-3} />
          <TechnicalReadout label="RESPONSE_TIME" value="42ms" />
          <TechnicalReadout label="UPTIME" value="99.98%" />
        </div>
      </div>
    </div>
  </div>
);

const LabelContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">ARTIST_ROSTER</h4>
        <div className="space-y-2">
          <TechnicalReadout label="ACTIVE_ARTISTS" value="7" trend={1} />
          <TechnicalReadout label="RELEASES_YTD" value="12" trend={3} />
          <TechnicalReadout label="AVG_STREAM_COUNT" value="142K" trend={15} />
          <TechnicalReadout label="DEVELOPMENT_PHASE" value="EXPANSION" />
        </div>
      </div>
      <div>
        <h4 className="font-mono text-sm mb-3 text-cyan-400">DISTRIBUTION</h4>
        <div className="space-y-2">
          <TechnicalReadout label="PRIMARY_PLATFORMS" value="7" />
          <TechnicalReadout label="TERRITORIES" value="142" />
          <TechnicalReadout label="LICENSING_OPPS" value="24" trend={8} />
          <TechnicalReadout label="ROYALTY_EFFICIENCY" value="97.2%" />
        </div>
      </div>
    </div>
  </div>
);

const THRTSHudInterface = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [systemTime, setSystemTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Simulate system time and occasional glitches
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
      
      // Random glitch effect
      if (Math.random() > 0.95) {
        setGlitchEffect(true);
        setSystemStatus('RECALIBRATING');
        
        setTimeout(() => {
          setGlitchEffect(false);
          setSystemStatus('OPERATIONAL');
        }, 1000);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Section icons mapping
  const sectionIcons: Record<string, any> = {
    'STUDIO': Activity,
    'APP': Triangle,
    'LABEL': Music
  };

  // Get content based on active section
  const getActiveContent = () => {
    switch(activeSection) {
      case 'STUDIO':
        return <StudioContent />;
      case 'APP':
        return <AppContent />;
      case 'LABEL':
        return <LabelContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Video Background */}
      <video 
        className="fixed inset-0 object-cover w-full h-full" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Interface Overlay */}
      <div className={`relative min-h-screen z-10 ${glitchEffect ? 'backdrop-blur-sm' : ''}`}>
        {/* Targeting Grid */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 49px,
                rgba(0, 255, 255, 0.05) 50px,
                rgba(0, 255, 255, 0.05) 50px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 49px,
                rgba(0, 255, 255, 0.05) 50px,
                rgba(0, 255, 255, 0.05) 50px
              )
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Corner brackets */}
        <div className="fixed top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50"/>
        <div className="fixed top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50"/>
        <div className="fixed bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50"/>
        <div className="fixed bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50"/>

        {/* Status bars */}
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        {/* THRTS Logo */}
        <div className={`fixed bottom-8 left-8 font-mono text-cyan-500/70 transition-all ${glitchEffect ? 'skew-x-1 translate-x-[1px]' : ''}`}>
          <div className="text-xs tracking-widest mb-2">OS_VER: 2.049</div>
          <div className="text-2xl">THRTS_ENGINEERED</div>
        </div>

        {/* Status Bar */}
        <div className="fixed top-8 left-8 right-8 flex justify-between items-center font-mono text-xs text-cyan-500/80">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm px-3 py-1 border-l border-cyan-500/30">
            <Globe className="w-3 h-3 opacity-50" />
            <span>LOC: 34°02'N 118°12'W</span>
          </div>
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm px-3 py-1">
            <Terminal className="w-3 h-3 opacity-50" />
            <span>SYS_TIME: {systemTime.toLocaleTimeString()}</span>
          </div>
          <div className={`flex items-center space-x-3 bg-black/20 backdrop-blur-sm px-3 py-1 border-r border-cyan-500/30 ${glitchEffect ? 'text-red-400' : ''}`}>
            <BarChart className="w-3 h-3 opacity-50" />
            <span>STATUS: {systemStatus}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-24 px-8 pb-20">
          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {['STUDIO', 'APP', 'LABEL'].map(section => {
              const Icon = sectionIcons[section];
              return (
                <div 
                  key={section}
                  className={`
                    relative backdrop-blur-sm
                    transition-all duration-500
                    ${activeSection === section ? 'col-span-3' : 'col-span-1'}
                    cursor-pointer hover:bg-cyan-500/5
                  `}
                  onClick={() => setActiveSection(activeSection === section ? null : section)}
                >
                  {/* Panel border */}
                  <div className="absolute inset-0 border border-cyan-500/30 pointer-events-none" />
                  
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500/80"/>
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyan-500/80"/>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyan-500/80"/>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-500/80"/>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-cyan-500 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {section}_SEQUENCE
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-70 font-mono">TVE 1/2</span>
                        <ChevronRight className={`w-4 h-4 transition-all ${activeSection === section ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {activeSection === section ? (
                      <div className="mt-6 animate-fadeIn">
                        {getActiveContent()}
                      </div>
                    ) : (
                      <div className="mt-4 flex justify-between items-center text-xs font-mono opacity-50">
                        <div>24556_DR</div>
                        <div>NORMAL</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Bottom Readout Panel - Only visible when no section is active */}
          {!activeSection && (
            <div className="mt-8 border-t border-cyan-500/30 pt-6 font-mono text-xs max-w-6xl mx-auto">
              <div className="grid grid-cols-4 gap-8">
                <div className="bg-black/30 backdrop-blur-sm p-4">
                  <h4 className="mb-3 text-cyan-400">ENGINE_SEC</h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 opacity-70">
                    <div>A-Engine</div><div>ACTIVE</div>
                    <div>B-Engine</div><div>ACTIVE</div>
                    <div>C-Engine</div><div>ACTIVE</div>
                    <div>D-Engine</div><div>ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default THRTSHudInterface;