<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Home page"
          to="/"
        >
          <q-tooltip>Home</q-tooltip>
        </q-btn>
        <q-toolbar-title>
          Register Page
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="container-fluid">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
