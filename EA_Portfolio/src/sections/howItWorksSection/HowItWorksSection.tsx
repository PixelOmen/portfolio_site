import React from "react";

import type { IScrollState } from "../../lib/scrolling";
import HIWItem from "./HIWItem";

interface HowItWorksSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
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

        <div className="mt-14 flex justify-around items-start gap-x-16 flex-wrap">
          <div className="min-[440px]:min-w-96 flex-1 flex flex-col gap-y-8 sm:gap-y-5 pb-8 sm:pb-5">
            <HIWItem
              title="Cloud Infrastructure on AWS"
              description="Hosted on AWS, this project takes advantage of cloud-native services, including RDS for managed PostgreSQL databases, S3 for static asset storage, and CloudFront for fast, global content delivery. The architecture is designed for resilience and high availability."
            />
            <HIWItem
              title="Containerization with Docker"
              description="Containerized using Docker, the application stack is fully portable and consistent across all environments. Docker Compose is utilized for local development, while AWS ECS handles container orchestration in production, ensuring seamless deployment and scaling."
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
              title="Microservices Architecture"
              description="This project is built on a foundation of decoupled, independently deployable services. Each service is designed to handle specific business functions, ensuring scalability and maintainability."
            />            
            <HIWItem
              title="CI/CD Pipeline"
              description="Automated CI/CD pipeline orchestrates the building, testing, and deployment. GitHub Actions integrates with AWS services to ensure consistent continuous delivery on every deployment."
            />
            <HIWItem
              title="Security Best Practices"
              description="Security is built into every layer of the infrastructure, from OAuth2 for authentication to the principle of least privilege in IAM roles. All of it helps maintain a secure and compliant environment."
            />                        
            <HIWItem
              title="Automated Compute Scaling"
              description="Infrastructure is designed to scale automatically based on demand, using ECS service scaling. This ensures that the application remains responsive and cost-efficient, adapting to traffic fluctuations seamlessly."
            />            
            <HIWItem
              title="Monitoring and Logging"
              description="Comprehensive monitoring and logging ensure that every aspect of the application is tracked and recorded. Using AWS CloudWatch and integrated logging solutions, any issues can be identified and addressed promptly."
            />            
          </div>
        </div>

      </div>
    </div>
  );
}