<script>
    import Icon from "./Icon.svelte";
</script>

<header>
    <nav>
    <a href="/">
        <img src="/logo.svg" class="logo" />
    </a>
        <ul class="top-nav">
            <li><a href="/about">About</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/login">Login</a></li>
            <div class="vl"></div>
            <li><a href="tel:3308586940" class="phone-number">
                <Icon type="phone" width="28"/> 
                <span><strong>330</strong>-858-6940</span>
            </a></li>
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
        align-items: center;
        gap: 2rem;
    }

    .vl {
        height: 1.5rem;
        border-inline-start: 1px solid #23313C;
    }

    .phone-number {
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
</style>