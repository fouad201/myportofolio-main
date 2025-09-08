const aboutData = {
    title: "About Me",
    subtitle: "Discover my journey, passions, and the story behind my work",
    image: "/assets/profile.png", 

    biodata: [
        { label: "Name", value: "Fouad Mohamed", icon: "bx bx-id-card" },
        { label: "Date of Birth", value: "December,20-1998", icon: "bx bx-calendar" },
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
            text: `I'm a frontend developer who crafts responsive, interactive, and clean UIs. With a background in Informatics Engineering, I blend design sense with technical logic.`,
            icon: "bx-info-circle"
        },
        approach: {
            text: `I focus on user-centered design, performance, and accessibility   always evolving with modern tech to deliver seamless digital experiences.`,
            icon: "bx-bulb"
        }
    }


};

export default aboutData;
