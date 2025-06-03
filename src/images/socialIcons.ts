// This file maps social network abbreviations to icon paths

// Import social icons (you may need to adjust these paths based on your actual file structure)
import facebookIcon from './facebookIcon.png';
import githubIcon from './githubIcon.png';
import instagramIcon from './instagramIcon.png';
import linkedinIcon from './linkedinIcon.png';
import xIcon from './xIcon.png';

// You can add more imports for other social networks

// Map social network abbreviations to their icons
const socialIcons: Record<string, string> = {
    Facebook: facebookIcon,
    LinkedIn: linkedinIcon,
    X: xIcon,
    Instagram: instagramIcon,
    GitHub: githubIcon,
};

export default socialIcons;
