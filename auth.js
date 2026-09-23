const SUPABASE_URL = 'https://pbfbuyvoffkmqvomaysp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-8_38j-CyXG7HbGDFij_Fg_6S2pRrs5';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Utility function to switch visible screens
function showSection(sectionId) {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('profile-section').style.display = 'none';
  document.getElementById('swipe-section').style.display = 'none';
  
  document.getElementById(sectionId).style.display = 'block';
}

async function handleSignUp() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const status = document.getElementById('statusMessage');

  if (!email.endsWith('@mavs.uta.edu') && !email.endsWith('@uta.edu')) {
    status.style.color = 'red';
    status.textContent = 'Please use an official UTA email (@mavs.uta.edu or @uta.edu)';
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    status.style.color = 'red';
    status.textContent = error.message;
  } else {
    status.style.color = 'green';
    status.textContent = 'Account created successfully!';
    console.log('User signed up:', data);

    // Switch screen to profile setup automatically upon success
    showSection('profile-section');
  }
}