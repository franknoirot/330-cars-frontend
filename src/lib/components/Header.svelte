<script>
    import Icon from "./Icon.svelte";
    let menuOpen = false
</script>

<header>
    <nav>
    <a href="/">
        <img src="/logo.svg" class="logo" alt="330 Cars" />
    </a>
        <ul class="top-nav">
            <div class="display-contents desktop-only">
                <li><a href="/about">About</a></li>
                <li><a href="/help">Help</a></li>
                <li><a href="/login">Login</a></li>
            </div>
            <li class="mobile-only">
                <a href="https://www.google.com/maps/place/330+N+Arlington+St,+Akron,+OH+44305/@41.0814338,-81.4928358,17z" target="_blank" rel="noopener noreferrer">
                    <Icon type="mapPin" width="16" />
                </a>
            </li>
            <div class="vl"></div>
            <li class="phone-number"><a href="tel:3308586940">
                <Icon type="phone" width="20"/> 
                <span class="desktop-only"><strong>330</strong>-858-6940</span>
            </a></li>
            <li class="mobile-only menu-toggle">
                <button on:click={() => { menuOpen = !menuOpen }}>
                    {#if !menuOpen}
                    <Icon type="menu" width="25" />
                    {:else}
                    <Icon type="x" width="25" />
                    {/if}
                </button>
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        background: white;
        border-bottom: solid 1px hsl(190deg, 20%, 85%);
        width: 100%;
        box-sizing: border-box;
    }

    nav {
        box-sizing: border-box;
        max-width: 1260px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        padding: 1rem;
    }

    .logo {
        width: 20vw;
        max-width: 200px;
        min-width: 125px;
    }

    ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 2rem;
        margin: 0;
        padding: 0;
    }

    .vl {
        height: 1.5rem;
        border-inline-start: 1px solid #B5CDE8;
    }

    .phone-number a {
        display: flex;
        align-items: center;
        color: inherit;
        gap: 6px;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        color: cornflowerblue;
    }

    .menu-toggle button {
        padding: 0;
        margin: 0;
        border: 0;
        background: 0;
    }

    @media(min-width: 769px) {
        .mobile-only {
            display: none;
        }
    }

    @media (max-width: 768px) {
        header {
            position: sticky;
            top: 0px;
            z-index: 5;
        }

        ul {
            gap: 1.5rem;
        }
        .phone-number {
            order: -1;
        }
    }
</style>