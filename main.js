import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, Star, Share2, Send, Copy, Smartphone, Shield, Award, TrendingUp, Users, ArrowRight, Loader2, Lock, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AprilFoolsPrank() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', upiId: '' });
  const [tasksComplete, setTasksComplete] = useState({ share: 0, survey: false, otp: false });
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activityItems, setActivityItems] = useState([
    { name: 'Priya S.', action: 'earned ₹150', time: '2m ago', emoji: '🎉' },
    { name: 'Vikram R.', action: 'completed tasks', time: 'Just now', emoji: '✅' },
    { name: 'Neha K.', action: 'withdrew ₹300', time: '5m ago', emoji: '💸' },
  ]);

  // Live activity feed updater
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        const names = ['Rahul K.', 'Anjali M.', 'Rohan P.', 'Sneha T.', 'Arjun S.', 'Divya L.'];
        const actions = [
          { text: 'earned ₹150', emoji: '🎉' },
          { text: 'completed verification', emoji: '✅' },
          { text: 'withdrew ₹250', emoji: '💸' },
          { text: 'joined today', emoji: '🌟' }
        ];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        setActivityItems(prev => [
          { name: randomName, action: randomAction.text, time: 'Just now', emoji: randomAction.emoji },
          ...prev.slice(0, 4)
        ]);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleShare = (platform) => {
    if (tasksComplete.share < 3) {
      setTasksComplete(prev => ({ ...prev, share: prev.share + 1 }));
      
      const message = "Bro check this app, I just earned ₹150! 🎉 https://earn150.app";
      
      if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      } else if (platform === 'copy') {
        navigator.clipboard.writeText(message);
      }
    }
  };

  const handleProcessing = async () => {
    setProcessing(true);
    const steps = [
      'Connecting to NPCI...',
      'Verifying UPI handle...',
      'Initiating transfer...',
      'Updating wallet balance...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00A651', '#FFD700', '#FF6B6B', '#4ECDC4']
    });
    
    setStep(6);
    setProcessing(false);
  };

  const progressPercentage = step === 1 ? 0 : step === 2 ? 20 : step === 3 ? 60 : step === 4 ? 85 : step === 5 ? 95 : 100;

  // Step 1: Landing Page
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans']">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                ₹
              </div>
              <span className="font-bold text-xl text-gray-900">EarnPay</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
              <Users className="w-4 h-4" />
              <span>10L+ Users</span>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Trending #1 in Finance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Refer & Earn<br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                ₹150 Instantly!
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-8">
              Join lakhs of Indians earning money daily. No investment. 100% genuine.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>RBI Approved*</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Lock className="w-5 h-5 text-emerald-600" />
                <span>Bank Grade Security</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="space-y-4 mb-8">
            <h3 className="text-center text-gray-900 font-semibold mb-4">What Our Users Say</h3>
            
            {[
              { name: 'Priya S.', location: 'Mumbai', text: 'Earned ₹450 last week! Instant transfer to my account.', rating: 5 },
              { name: 'Rahul M.', location: 'Delhi', text: 'Best earning app ever. Received money within seconds!', rating: 5 },
              { name: 'Anjali K.', location: 'Bangalore', text: 'Totally genuine. Already referred 10 friends!', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>

          {/* Fine Print */}
          <p className="text-center text-xs text-gray-400 mt-8">
            *Promotional offer valid only on April 1st, 2026. Subject to terms and conditions.
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Registration
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans']">
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-4">
              ₹
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Enter your details to start earning</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-semibold text-emerald-900 mb-1">Your data is safe</div>
                    <div className="text-emerald-700">256-bit encryption • No spam • Instant deletion on request</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-emerald-600 underline hover:text-emerald-700"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-emerald-600 underline hover:text-emerald-700"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>

            <button
              onClick={() => formData.name && formData.email && termsAccepted && setStep(3)}
              disabled={!formData.name || !formData.email || !termsAccepted}
              className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Create Account
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <button className="text-emerald-600 font-medium">Sign In</button>
          </p>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
            <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Terms of Service & Privacy Policy</h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 text-sm text-gray-600 leading-relaxed space-y-4 flex-1">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">1. User Agreement</h4>
                  <p>By accessing and using EarnPay ("the Service"), you agree to be bound by these Terms of Service. The Service provides a platform for users to participate in referral programs and earn rewards through legitimate promotional activities.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Eligibility</h4>
                  <p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all terms and conditions herein.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">3. Account Registration</h4>
                  <p>To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">4. Payment and Rewards</h4>
                  <p>Rewards are subject to verification and compliance with program rules. The Company reserves the right to withhold, delay, or cancel any rewards if fraud, violation of terms, or suspicious activity is detected. Payment processing may take 3-7 business days.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">5. Data Collection and Privacy</h4>
                  <p>We collect and process personal information in accordance with our Privacy Policy. This includes but is not limited to name, email address, phone number, payment information, and usage data. We may share anonymized data with third-party partners for analytics purposes.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">6. User Conduct</h4>
                  <p>You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the Service. Prohibited activities include but are not limited to fraudulent referrals, automated signups, account manipulation, or any form of abuse.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">7. Intellectual Property</h4>
                  <p>All content, features, and functionality of the Service are owned by the Company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">8. Disclaimer of Warranties</h4>
                  <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">9. Limitation of Liability</h4>
                  <p>IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">10. Indemnification</h4>
                  <p>You agree to defend, indemnify, and hold harmless the Company and its affiliates from any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Service.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">11. Termination</h4>
                  <p>We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">12. Miscellaneous Provisions</h4>
                  <p>These Terms constitute the entire agreement between you and the Company regarding the Service. If any provision is found to be unenforceable, the remaining provisions will remain in full effect. Our failure to enforce any right or provision shall not be considered a waiver.</p>
                  
                  <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                    <strong>IMPORTANT NOTICE:</strong> This is a demonstration application created for entertainment purposes only, specifically for April Fool's Day 2026. No personal data submitted through this application is collected, stored, transmitted to any server, or used for any purpose whatsoever. All processing occurs locally in your browser. This promotional offer is valid exclusively on April 1st, 2026, and no actual monetary rewards or payments will be issued. By continuing to use this application, you acknowledge that you understand this is a novelty entertainment experience and not a genuine financial services platform.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">13. Governing Law and Arbitration</h4>
                  <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law provisions. Any disputes shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996.</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">14. Contact Information</h4>
                  <p>For questions about these Terms, please contact us at legal@earnpay.app or write to us at EarnPay Legal Department, 123 Finance Street, Mumbai 400001, India.</p>
                </div>

                <p className="text-xs text-gray-400 mt-6">Last updated: April 1, 2026</p>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowTerms(false);
                    setTermsAccepted(true);
                  }}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Accept & Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Step 3: Dashboard
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans']">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Welcome back,</span>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{formData.name || 'User'}</h2>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-6">
          {/* Earnings Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-3xl p-6 text-white shadow-xl mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-emerald-100 text-sm mb-1">Available Balance</div>
                <div className="text-4xl font-bold">₹150.00</div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Award className="w-8 h-8" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Unlock Progress</span>
                <span className="font-semibold">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Task CTA */}
          <button
            onClick={() => setStep(4)}
            className="w-full bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 mb-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">Complete Tasks</div>
                <div className="text-sm text-gray-600">Unlock your ₹150 now</div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
          </button>

          {/* Live Activity Feed */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Live Activity</h3>
              <div className="flex items-center gap-2 text-xs text-emerald-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Real-time</span>
              </div>
            </div>

            <div className="space-y-3">
              {activityItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{item.action}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Total Users', value: '10L+', icon: Users },
              { label: 'Paid Out', value: '₹50Cr+', icon: TrendingUp },
              { label: 'Trust Score', value: '4.8★', icon: Award }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <stat.icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Step 4: Tasks
  if (step === 4) {
    const allTasksComplete = tasksComplete.share >= 3 && tasksComplete.survey && tasksComplete.otp;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans']">
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Tasks</h2>
            <p className="text-gray-600">3 simple steps to unlock ₹150</p>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-bold text-emerald-600">
                {tasksComplete.share >= 3 && tasksComplete.survey && tasksComplete.otp ? '100%' : 
                 tasksComplete.share >= 3 && tasksComplete.survey ? '85%' :
                 tasksComplete.share >= 3 ? '60%' : `${tasksComplete.share * 20}%`}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ 
                  width: tasksComplete.share >= 3 && tasksComplete.survey && tasksComplete.otp ? '100%' : 
                         tasksComplete.share >= 3 && tasksComplete.survey ? '85%' :
                         tasksComplete.share >= 3 ? '60%' : `${tasksComplete.share * 20}%`
                }}
              />
            </div>
          </div>

          {/* Task 1: Share */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tasksComplete.share >= 3 ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                  {tasksComplete.share >= 3 ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Share2 className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Share with Friends</h3>
                  <p className="text-sm text-gray-600">Help us grow! Share with 3 friends</p>
                </div>
              </div>
              <div className="text-sm font-bold text-emerald-600">{tasksComplete.share}/3</div>
            </div>

            {tasksComplete.share < 3 && (
              <div className="space-y-2">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-100 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center justify-center gap-3 bg-gray-50 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  <Copy className="w-5 h-5" />
                  Copy Link
                </button>
              </div>
            )}

            {tasksComplete.share > 0 && tasksComplete.share < 3 && (
              <div className="mt-3 flex gap-2">
                {[...Array(3)].map((_, idx) => (
                  <div 
                    key={idx}
                    className={`flex-1 h-2 rounded-full ${idx < tasksComplete.share ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Task 2: Survey */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tasksComplete.survey ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                  {tasksComplete.survey ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Star className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Quick Survey</h3>
                  <p className="text-sm text-gray-600">Answer 3 simple questions</p>
                </div>
              </div>
            </div>

            {!tasksComplete.survey ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                  <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none">
                    <option>Select an option</option>
                    <option>Friend Referral</option>
                    <option>Social Media</option>
                    <option>Advertisement</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How likely are you to recommend us? (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="8"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate your experience</label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-3xl hover:scale-110 transition-transform">
                        <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setTasksComplete(prev => ({ ...prev, survey: true }))}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Submit Survey
                </button>
              </div>
            ) : (
              <div className="text-center py-2 text-emerald-600 font-medium">
                ✓ Survey completed
              </div>
            )}
          </div>

          {/* Task 3: OTP */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tasksComplete.otp ? 'bg-emerald-500' : 'bg-gray-100'}`}>
                  {tasksComplete.otp ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Verify Phone</h3>
                  <p className="text-sm text-gray-600">For RBI compliance & security</p>
                </div>
              </div>
            </div>

            {!tasksComplete.otp ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Enter any 6-digit code to verify
                </div>
                
                <div className="flex gap-2 justify-center">
                  {[...Array(6)].map((_, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength="1"
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      onInput={(e) => {
                        if (e.target.value && idx < 5) {
                          e.target.nextElementSibling?.focus();
                        }
                        if (idx === 5 && e.target.value) {
                          setTimeout(() => setTasksComplete(prev => ({ ...prev, otp: true })), 500);
                        }
                      }}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-gray-500">
                  Didn't receive code? <button className="text-emerald-600 font-medium">Resend</button>
                </p>
              </div>
            ) : (
              <div className="text-center py-2 text-emerald-600 font-medium">
                ✓ Phone verified successfully
              </div>
            )}
          </div>

          {/* Continue Button */}
          {allTasksComplete && (
            <button
              onClick={() => setStep(5)}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 animate-bounce-subtle"
            >
              Claim ₹150 Now
              <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <style jsx>{`
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Step 5: UPI Selection
  if (step === 5) {
    const upiApps = [
      { name: 'Google Pay', color: 'from-blue-500 to-blue-600', textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
      { name: 'PhonePe', color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
      { name: 'Paytm', color: 'from-blue-400 to-blue-500', textColor: 'text-blue-500', bgColor: 'bg-blue-50' },
      { name: 'Amazon Pay', color: 'from-orange-400 to-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50' },
      { name: 'BHIM UPI', color: 'from-gray-700 to-gray-800', textColor: 'text-gray-700', bgColor: 'bg-gray-50' }
    ];

    if (processing) {
      const messages = [
        'Connecting to NPCI...',
        'Verifying UPI handle...',
        'Initiating transfer...',
        'Updating wallet balance...'
      ];

      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans'] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
              <Loader2 className="w-20 h-20 text-emerald-600 mx-auto mb-6 animate-spin" />
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Processing Payment</h3>

              <div className="space-y-4 mb-8">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-500 ${
                      idx <= loadingStep ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    {idx <= loadingStep ? (
                      idx === loadingStep ? (
                        <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                      ) : (
                        <Check className="w-5 h-5 flex-shrink-0" />
                      )
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
                    <span className="font-medium">{msg}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <Lock className="w-4 h-4 inline mr-2" />
                Secure transaction in progress. Do not close this window.
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 font-['DM_Sans']">
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Almost There!</h2>
            <p className="text-gray-600">Select your UPI app to receive ₹150</p>
          </div>

          {/* Amount Display */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-xl mb-6">
            <div className="text-emerald-100 text-sm mb-2">Amount to Receive</div>
            <div className="text-5xl font-bold mb-2">₹150.00</div>
            <div className="text-emerald-100 text-sm">Instant UPI Transfer</div>
          </div>

          {/* UPI App Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
            
            <div className="space-y-3 mb-6">
              {upiApps.map((app) => (
                <button
                  key={app.name}
                  onClick={() => setSelectedBank(app.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    selectedBank === app.name
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {app.name[0]}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{app.name}</div>
                    <div className="text-sm text-gray-500">UPI Payment</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedBank === app.name
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedBank === app.name && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              ))}
            </div>

            {selectedBank && (
              <div className="space-y-4 animate-slide-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Example: yourname@paytm, yourname@okaxis
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Your UPI ID is encrypted with 256-bit SSL
                </div>

                <button
                  onClick={handleProcessing}
                  disabled={!formData.upiId}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Receive ₹150 Now
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Step 6: April Fool Reveal
  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 font-['DM_Sans'] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float-1" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full animate-float-2" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full animate-float-3" />
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center">
            {/* Emoji Header */}
            <div className="text-7xl mb-6 animate-bounce-slow">
              😂🎉
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              APRIL FOOL!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Bro, you just did ALL of this for ₹0:
            </p>

            {/* Checklist */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 text-left">
              <div className="space-y-3">
                {[
                  'Read 0 words of Terms & Conditions',
                  'Shared this prank with 3 friends (oops! 💀)',
                  'Completed a fake survey',
                  'Entered a fake OTP code',
                  'Selected your UPI app',
                  'Gave us your UPI ID'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Display */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 text-white">
              <div className="text-gray-400 text-sm mb-2">Final Balance Credited</div>
              <div className="text-6xl font-black mb-2">₹0.00</div>
              <div className="text-gray-400 text-sm">
                (Shocking, we know! 🤣)
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
              <p className="text-blue-900 font-semibold mb-2">
                📢 Important: No Data Was Stored
              </p>
              <p className="text-blue-800 text-sm">
                This was a harmless April Fool's prank! Your information was never collected, stored, or transmitted anywhere. 
                Check Section 12, Paragraph 4 of the Terms you didn't read. 😉
              </p>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              Happy April Fool's Day! 🎊
            </p>

            {/* Share Button */}
            <button
              onClick={() => {
                const message = "I just got pranked by the most realistic fake UPI app 😂 Try it on your friends!";
                navigator.clipboard.writeText(message);
                alert('Link copied! Go prank your friends! 🎉');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Prank Your Friends Too!
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, 20px) scale(1.1); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, -20px) scale(0.9); }
          }
          @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(15px, -15px) rotate(180deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 10s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
          .animate-slide-in { animation: slide-in 0.5s ease-out forwards; }
        `}</style>
      </div>
    );
  }

  return null;
}
