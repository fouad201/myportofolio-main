const aboutData = {
    title: "About Me",
    subtitle: "Discover my journey, passions, and the story behind my work",
    image: "/assets/profile.png", 

    biodata: [
        { label: "Name", value: "Fouad Mohamed", icon: "bx bx-id-card" },
        { label: "Date of Birth", value: "January,20-1998", icon: "bx bx-calendar" },
        { label: "Place of Birth", value: "Egypt-Cairo", icon: "bx bx-map" },
        { label: "Email", value: "fouadmekawy@gmail.com", icon: "bx bx-envelope" },
        { label: "Phone", value: "01113882381", icon: "bx bx-phone" },
       
    ],

    resume: {
        label: "Download My Resume",
        href: null,
        icon: "bx bx-download",
    },

    aboutNarrative: {
        whoAmI: {
            text: `I’m a Full-Stack Developer passionate about crafting end-to-end web experiences with Django and React. With a foundation in Informatics Engineering, I combine creativity, clean design, and solid backend logic to build apps that are fast, reliable, and delightful to use.`,
            icon: "bx-info-circle"
        },
        approach: {
            text: `I focus on creating user-centered, high-performance web apps with Django and React — blending clean design, efficient code, and modern tech to deliver smooth, impactful experiences.`,
            icon: "bx-bulb"
        }
    }


};

export default aboutData;
