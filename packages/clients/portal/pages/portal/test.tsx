import React from 'react';

const test = async () => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code');
    console.log(code);

    var url = new URL("http://localhost:8080/LoginWithMicrosoft");
    url.searchParams.set('code', code);
    const response = await fetch(url, {
        method: 'POST',
    });

}

export default function Page() {
    test()

    return (
        <h1>Test</h1>
    );
}
