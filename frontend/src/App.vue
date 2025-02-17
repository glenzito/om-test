<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link 
              to="/" 
              class="flex items-center px-2 py-2 text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span class="text-xl font-bold">World Countries</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto py-6">
      <RouterView/>
    </main>

    <footer class="bg-white shadow-md mt-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-600">
          Data provided by REST Countries API
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

