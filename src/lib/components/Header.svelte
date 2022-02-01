<header>
    <nav>
    <a href="/">
        <img src="/logo.svg" class="logo" />
    </a>
        <ul class="top-nav">
            <li><a href="/about">About</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/login">Login</a></li>
        </ul>
    </nav>
</header>

<style>
    header {
        background: white;
        border-bottom: solid 1px hsl(190deg, 20%, 85%);
    }

    nav {
        max-width: 1260px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        padding: .5rem 1rem;
    }

    .logo {
        width: 20vw;
        max-width: 200px;
    }

    ul {
        list-style: none;
        display: flex;
        gap: 2rem;
    }

    a {
        color: hsl(190deg, 60%, 35%);
        text-decoration: none;
    }
</style>