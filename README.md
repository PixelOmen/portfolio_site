
# Portfolio Frontend

The front-end for my portfolio project. A single-page application (SPA), built with **React**, **Vite**, **Axios**, and **TailwindCSS**. This project interfaces with the backend via a [Django REST API](https://github.com/PixelOmen/portfolio_api) hosted on AWS. Designed to be responsive, accessible, and performant, with a focus on user experience. It showcases various projects, skills, and contact information, providing a clean and intuitive interface for visitors to explore.

## Features / Tech Stack
- **TypeScript**: Enforced type safety, reducing bugs, and improving maintainability and productivity.
- **React**: State is managed using a component-based architecture, allowing for modular, reusable UI elements.
- **Axios**: Instances and Interceptors are used for handling interactions with the back-end and managing tokens / cookies.
- **Tailwind CSS**: Rapid, responsive, and consistent styling, designed to work across all devices and screen sizes.
- **OAuth2**: Secure authentication and token management, enabling user login and session handling.
- **WebSockets**: Real-time communication used in the chatbot demo.
- **AWS CloudFront**: Static files are served via a performant CDN.

## Continuous Deployment
This project utilizes GitHub Actions for automating the build and deployment process. It's deployed to **AWS CloudFront**. The following steps are triggered on each push to the staging or production branches:

- Build: The frontend is built using Vite create an optimized production version.
- Deployment: The build artifacts are automatically uploaded to the S3 bucket configured for CloudFront.
- Cache Invalidation: The CloudFront distribution cache is invalidated to ensure the latest version is served to users.

## License
[MIT](https://choosealicense.com/licenses/mit/)