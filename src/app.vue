<template>
  <section class="db">
    <template v-if="!$route.meta.hidden">
      <header class="db-header">
        <router-link class="logo" :to="{path: '/list/filters'}">Element Dashboard</router-link>
        <db-navbar mode="horizontal"></db-navbar>
        <db-userinfo/>
      </header>
      <div class="db-body">
        <aside class="db-menu-wrapper">
          <db-navbar></db-navbar>
        </aside>
        <div class="db-content-wrapper">
          <section class="db-content">
            <router-view></router-view>
          </section>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </section>
</template>
