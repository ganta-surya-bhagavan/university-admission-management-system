package com.cg.UniversityAdmissionSystem;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.cg.UniversityAdmissionSystem.Entity.User;
import com.cg.UniversityAdmissionSystem.dao.UserRepository;

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
public class PlpLoginServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlpLoginServiceApplication.class, args);
	}
	@LoadBalanced 
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	@Autowired
    private UserRepository repository;

    @PostConstruct
    public void initUsers() {
        List<User> users = Stream.of(
                new User(101, "surya", "password", "surya@gmail.com"),
                new User(102, "sudhanshu", "password", "sudhanshu@gmail.com"),
                new User(103, "prerak", "password", "prerak@gmail.com")
        ).collect(Collectors.toList());
        repository.saveAll(users);
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
    	return new WebMvcConfigurer() {
    		@Override
    		public void addCorsMappings(CorsRegistry registry) {
    			registry.addMapping("/*").allowedHeaders("*").allowedOrigins("*").allowedMethods("*").allowCredentials(true);
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
