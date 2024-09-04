import { ReactNode, useContext } from "react";

import type { IScrollState } from "../../lib/scrolling";

import HIWItem from "./HIWItem";
import ExpandContextProvider, { ExpandContext } from "./ExpandContextProvider";

interface HowItWorksSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: ReactNode
}

export default function AboutSection({
  className = ''
}: HowItWorksSectionProps) {

  return (
    <div className={`bg-[rgba(31,31,31,0)] p-6 sm:p-14 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div        
        className="relative w-full max-w-[1500px] overflow-hidden"
      >

        <div className="text-[#EF8275] w-full text-4xl sm:text-5xl mb-8 text-center font-medium">
          How
          <span className="ml-3 font-thin text-gray-200 font-roboto">It Works</span>
          <div className="mt-2 px-2 text-base sm:text-lg font-light font-sans text-gray-200 ">
            A dive into the architecture powering this project.
          </div>
          <hr className="block mx-auto mt-4 w-3/4"/>
        </div>

        <ExpandContextProvider>
          <div className="p-4 sm:p-6 bg-slate-800 rounded-md border-2 border-black">
            While the scope of this project might not demand a full-fledged production infrastructure, I've implemented a setup that mirrors industry standards. It's not just about building something that works — it's about demonstrating how to build something that scales, adapts, and performs under real-world conditions. Here's a look at the architecture powering this project.
          </div>
          <div className="flex justify-center gap-10 mt-8 text-[#EF8275] font-bold">
              <ContextButtons/>
          </div>

          <div className="mt-8 flex justify-around items-start gap-x-16 flex-wrap">
              <div className="min-[440px]:min-w-96 flex-1 flex flex-col gap-y-8 sm:gap-y-5 pb-8 sm:pb-5">
                <HIWItem
                  title="Cloud Infrastructure on AWS"
                  description="Hosted on AWS, this project takes advantage of cloud-native services, including RDS for managed PostgreSQL databases, S3 for static asset storage, and CloudFront for fast, global content delivery. The architecture is designed for resilience and high availability."
                />
                <HIWItem
                  title="Microservices Architecture"
                  description="This project is built on a foundation of decoupled, independently deployable services. Each service is designed to handle specific business functions, ensuring scalability and maintainability."
                  />            
                <HIWItem
                  title="Database Management"
                  description="Utilizing PostgreSQL via Amazon RDS, the database layer is optimized for performance and security. The setup includes automated backups and robust migration strategies to ensure data integrity and seamless updates."
                />
                <HIWItem
                  title="Scalable Task Workers"
                  description="Background tasks are managed with Celery, allowing for efficient and scalable execution of asynchronous jobs. Combined with Redis for queuing, this setup ensures that tasks are processed reliably and in real-time."
                />
                <HIWItem
                  title="Performance Optimization"
                  description="Optimized for performance, the infrastructure leverages caching strategies at multiple levels, including Redis for fast data access and CloudFront for CDN. The result is a fast and responsive user experience, even under high load."
                />            
              </div>
              <div className="min-[440px]:min-w-96 flex-1 flex flex-col gap-y-8 sm:gap-y-5 pb-8 sm:pb-5">
                <HIWItem
                  title="Infrastructure as Code (Terraform)"
                  description="Infrastructure is defined and managed using Terraform, enabling consistent and repeatable deployments across all environments. With version-controlled IaC, every change is tracked and auditable, ensuring transparency and reducing the risk of configuration drift. Terraform's modular approach allows for easy updates and scaling, making infrastructure management efficient and scalable."
                />
                <HIWItem
                  title="Containerization with Docker"
                  description="Containerized using Docker, the application stack is fully portable and consistent across all environments. Docker Compose is utilized for local development, while AWS ECS handles container orchestration in production, ensuring seamless deployment and scaling."
                />            
                <HIWItem
                  title="Security Best Practices"
                  description="Security is built into every layer of the infrastructure, from OAuth2 for authentication to the principle of least privilege in IAM roles. All of it helps maintain a secure and compliant environment."
                />                                   
                <HIWItem
                  title="CI/CD Pipeline"
                  description="Automated CI/CD pipeline orchestrates the building, testing, and deployment. GitHub Actions integrates with AWS services to ensure consistent continuous delivery on every deployment."
                />
                <HIWItem
                  title="Monitoring and Logging"
                  description="Comprehensive monitoring and logging ensure that every aspect of the application is tracked and recorded. Using AWS CloudWatch and integrated logging solutions, any issues can be identified and addressed promptly."
                />            
              </div>
          </div>
        </ExpandContextProvider>

      </div>
    </div>
  );
}


function ContextButtons() {
  const { setAllExpanded } = useContext(ExpandContext);

  function setValues(value: boolean) {
    if (setAllExpanded) {
      setAllExpanded({ expand: value });
    }
  }

  return (
    <>
      <button
        onClick={() => setValues(false)}
        title="Collapse All"
        className="hover:scale-x-75 transition-all active:scale-x-100"
      >
        {">---<"}            
      </button>
      <button
        onClick={() => setValues(true)}
        title="Expand All"
        className="hover:scale-x-125 transition-all active:scale-x-100"
      >
        {"<--->"}
      </button>
    </>
  )
}