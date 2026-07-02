export default function PrivacyPolicy() {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-slate-900 mb-12">Privacy Policy</h1>
          
          <div className="space-y-10 text-slate-600">
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Information We Collect</h3>
              <p>We collect information you explicitly share with us, including your profile data, the recipes you create, and usage interactions to enhance your personalized experience on Whisk.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Data Usage & Protection</h3>
              <p>Your data is used solely to improve our services and community features. We implement strict security measures to protect your information from unauthorized access, misuse, or theft.</p>
            </div>
  
            <div className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Your Data Rights</h3>
              <p>You have full control over your personal data. You may access, update, or request the permanent deletion of your account and all associated data at any time through your settings.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }