package com.cg.UniversityAdmissionSystem;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlpCourseServiceApplicationTests {

	@LocalServerPort
	int randomServerPort;
	@Test
	public void testGetCourseSuccess() throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
		final String url = "http://localhost:"+randomServerPort+"/courseList";
		URI endPointURL = new URI(url);
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(endPointURL,String.class);
		Assertions.assertEquals(200,responseEntity.getStatusCodeValue());
		Assertions.assertNotEquals("",responseEntity.getBody());
	}

}
