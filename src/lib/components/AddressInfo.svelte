<script>
    import Icon from '$lib/components/Icon.svelte'
</script>

<a href="https://www.google.com/maps/place/330+N+Arlington+St,+Akron,+OH+44305/@41.0814338,-81.4928358,17z" target="_blank" rel="noopener noreferrer">
    <Icon type="mapPin"/>
    <div>
        <small>Located at</small>
        <p>330 Arlington Road <br/>Akron, OH 44312</p>
    </div>
</a>

<style>
    a {
        text-decoration: none;
        color: inherit;
        display: grid;
        grid-template-columns: 35px auto;
        align-items: center;
        gap: 20px;
    }

    a:hover {
        color: cornflowerblue;
    }

    small, p {
        margin: 7px 0;
    }

    small {
        font-size: 1.125rem;
        font-weight: 600;
    }

    p {
        font-size: 1.2rem;
        font-weight: 300;
    }
</style>