<template>
  <div class="main">
    <b-container fluid="lg">
      <b-navbar id="mainNavbar" toggleable="lg" type="light">
        <b-navbar-brand href="/">
          <img src="~static/imgs/berlinrents_logo.png" class="logo" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <nuxt-link to="/" class="nav-link">Home</nuxt-link>
            </b-nav-item>
            <b-nav-item>
              <nuxt-link to="/about" class="nav-link">About</nuxt-link>
            </b-nav-item>
            <b-nav-item>
              <nuxt-link to="/rent-estimate" class="nav-link"
                >Estimate your rent</nuxt-link
              >
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <main>
      <nuxt class="h-100" />
    </main>

    <footer class="navbar navbar-default py-3 bg-light text-grey-50">
      <div class="container">
        <div class="d-flex flex-row">
          <div class="mx-3">
            <nuxt-link to="/imprint">Imprint</nuxt-link>
          </div>
          <div class="mx-3">
            <nuxt-link to="/legal-notice">Legal Notice</nuxt-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
div.main {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* Footer */

footer a {
  color: black;
}

footer a:link {
  text-decoration: none;
}

footer a:hover {
  text-decoration: none;
  color: black;
}

/* Navbar */

#mainNavbar {
  font-size: 1.5rem;
  font-weight: 100;
}

#mainNavbar .nav-link {
  color: black;
}

#mainNavbar .nav-link:hover {
  color: black;
}

#mainNavbar .navbar-brand {
  color: black;
  font-size: 1.5rem;
}

.navbar.scrolled {
  background: rgb(212, 212, 212, 0.5);
  transition: background 500ms;
}

@media (max-width: 768px) {
  nav.navbar {
    background: white;
  }
}
</style>
