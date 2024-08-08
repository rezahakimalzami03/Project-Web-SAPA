import React from 'react';
import { Link } from '@inertiajs/react';

function Paginator({ meta }) {
    const Next = meta.links[meta.links.length - 1].url;
    const Previous = meta.links[0].url;
    const Current = meta.current_page;

    return (
        <div class="join">
            {Previous && <Link href={Previous} class="join-item btn">«</Link>}
            <button class="join-item btn">{Current}</button>
            {Next && <Link href={Next} class="join-item btn">»</Link>}
        </div>
    )
}

export default Paginator;