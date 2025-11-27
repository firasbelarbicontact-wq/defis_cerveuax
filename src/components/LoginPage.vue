<template>
  <div class="auth-wrapper">
    <!-- Gradient orbs background -->
    <div class="auth-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <!-- Floating shapes -->
    <div class="floating-shapes">
      <div class="shape shape-1">🃏</div>
      <div class="shape shape-2">➕</div>
      <div class="shape shape-3">⚡</div>
      <div class="shape shape-4">❓</div>
    </div>

    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100 py-5">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6">
          <!-- Back to home button -->
          <router-link to="/" class="back-button mb-4">
            <span class="back-icon">←</span>
            <span>Retour à l'accueil</span>
          </router-link>

          <div class="auth-card">
            <div class="auth-card-inner">
              <!-- Logo section -->
              <div class="auth-header text-center mb-4">
                <div class="auth-logo mb-3">
                  <span class="logo-icon">🧠</span>
                </div>
                <h1 class="auth-title">Bon Retour !</h1>
                <p class="auth-subtitle">Connectez-vous pour continuer votre aventure cognitive</p>
              </div>

              <!-- Login form -->
              <form @submit.prevent="handleLogin" class="auth-form">
                <div class="form-group mb-4">
                  <label class="form-label">Adresse Email</label>
                  <div class="input-wrapper">
                    <span class="input-icon">📧</span>
                    <input
                      type="email"
                      v-model="email"
                      class="form-input"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div class="form-group mb-4">
                  <label class="form-label">Mot de Passe</label>
                  <div class="input-wrapper">
                    <span class="input-icon">🔒</span>
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      class="form-input"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="toggle-password"
                    >
                      {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                    </button>
                  </div>
                </div>

                <div class="form-options mb-4">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" v-model="rememberMe" />
                    <span class="checkbox-label">Se souvenir de moi</span>
                  </label>
                  <a href="#" class="forgot-link">Mot de passe oublié ?</a>
                </div>

                <button type="submit" class="btn-submit" :disabled="loading">
                  <span v-if="!loading">Se Connecter</span>
                  <span v-else class="loading-spinner">⏳</span>
                  <span class="btn-arrow">→</span>
                </button>
              </form>

              <!-- Divider -->
              <div class="divider my-4">
                <span class="divider-text">ou</span>
              </div>

              <!-- Social login -->
              <div class="social-login mb-4">
                <button class="social-btn social-btn-google">
                  <span class="social-icon">🔍</span>
                  <span>Continuer avec Google</span>
                </button>
                <button class="social-btn social-btn-facebook">
                  <span class="social-icon">📘</span>
                  <span>Continuer avec Facebook</span>
                </button>
              </div>

              <!-- Register link -->
              <div class="auth-footer text-center">
                <p class="footer-text">
                  Pas encore de compte ?
                  <router-link to="/register" class="footer-link">
                    Créez-en un maintenant
                  </router-link>
                </p>
              </div>
            </div>
          </div>

          <!-- Trust badges -->
          <div class="trust-badges">
            <div class="trust-badge">
              <span class="trust-icon">🔒</span>
              <span class="trust-text">Connexion Sécurisée</span>
            </div>
            <div class="trust-badge">
              <span class="trust-icon">⚡</span>
              <span class="trust-text">Accès Instantané</span>
            </div>
            <div class="trust-badge">
              <span class="trust-icon">🎁</span>
              <span class="trust-text">100% Gratuit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      loading: false
    };
  },
  methods:{
  async handleLogin() {
  this.loading = true;
  this.$emit("loading", true);

  setTimeout(() => {
    this.loading = false;
    this.$emit("loading", false);

    // informer le parent que l'utilisateur s'est connecté
    this.$emit("login-success", {
      email: this.email,
      remember: this.rememberMe
    });

    // 👉 Redirection vers la HomePage
    this.$router.push({ name: "HomePage" });
  }, 1500);
}
}
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.auth-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.auth-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #667eea, transparent);
  top: -200px;
  right: -200px;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #764ba2, transparent);
  bottom: -150px;
  left: -150px;
  animation-delay: 7s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 14s;
}

.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  font-size: 3rem;
  opacity: 0.1;
  filter: drop-shadow(0 10px 30px rgba(255, 255, 255, 0.2));
}

.shape-1 { top: 10%; right: 10%; animation: float 8s infinite ease-in-out; }
.shape-2 { top: 60%; left: 5%; animation: float 10s infinite ease-in-out 2s; }
.shape-3 { bottom: 20%; right: 20%; animation: float 9s infinite ease-in-out 1s; }
.shape-4 { bottom: 10%; left: 20%; animation: float 11s infinite ease-in-out 3s; }

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-5px);
  color: white;
}

.back-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-3px);
}

.auth-card {
  position: relative;
  animation: slideUp 0.6s ease-out;
}

.auth-card-inner {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 3rem;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.auth-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  animation: pulse 3s infinite;
}

.logo-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 30px rgba(138, 43, 226, 0.6));
}

.auth-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1.25rem;
  font-size: 1.25rem;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.toggle-password {
  position: absolute;
  right: 1.25rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: white;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
}

.checkbox-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  color: #f093fb;
}

.btn-submit {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.btn-submit:hover:not(:disabled) .btn-arrow {
  transform: translateX(5px);
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

.divider {
  position: relative;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  font-weight: 500;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-btn {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.social-icon {
  font-size: 1.5rem;
}

.footer-text {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.footer-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #f093fb;
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.trust-icon {
  font-size: 1.5rem;
}

.trust-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .auth-card-inner {
    padding: 2rem;
  }

  .auth-title {
    font-size: 2rem;
  }

  .trust-badges {
    gap: 1rem;
  }

  .trust-badge {
    flex: 1 1 calc(50% - 0.5rem);
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .auth-card-inner {
    padding: 1.5rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }

  .trust-badge {
    flex: 1 1 100%;
  }
}
</style>