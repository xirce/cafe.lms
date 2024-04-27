window.addEventListener("load", function () {
    const postLogoutRedirectUri = document.querySelector("a.PostLogoutRedirectUri");
    if (postLogoutRedirectUri) {
        window.location = postLogoutRedirectUri.href;
    }
});