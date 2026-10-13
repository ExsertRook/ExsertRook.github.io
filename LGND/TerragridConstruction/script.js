document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const service = document.getElementById("service-type").value;

            alert(`Thank you, ${name}! Your request for "${service}" has been received. Terragrid Construction will reach out via ${email} shortly.`);
            
            contactForm.reset();
        });
    }
});