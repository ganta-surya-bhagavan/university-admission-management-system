package com.cg.UniversityAdmissionSystem;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableDiscoveryClient
@EnableSwagger2
@ComponentScan("com.cg.UniversityAdmissionSystem")
public class PlpApplicantServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlpApplicantServiceApplication.class, args);
	}
	@LoadBalanced 
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:4200");
			}
		};
	}
	
	@Bean
	public Docket swaggerConfiguration() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.paths(PathSelectors.any())
				.apis(RequestHandlerSelectors.basePackage("com.cg.UniversityAdmissionSystem"))
				.build()
				.apiInfo(myApiInfo());
		
	}
private ApiInfo myApiInfo() {
		return new ApiInfo(
			"SPRING WITH SWAGGER API", 
		     "API CREATION", 
		     "1.0", 
		     "Free to Use", 
		     new Contact("Sudhanshu","/api" ,"sudhanshurajpal9741@gmail.com"),
		     "API licence",
		     "/api",
		     Collections.emptyList());
	
}
}
