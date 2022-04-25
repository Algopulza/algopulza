package com.algopulza.backend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BackendApplication {

    public static final String APPLICATION_LOCATION = "spring.config.location="
            + "classpath:application.properties,"
            + "classpath:aws.yml,"
            + "classpath:solvedac.yml";

    public static void main(String[] args) {

        // SpringApplication.run(BackendApplication.class, args);
        new SpringApplicationBuilder(BackendApplication.class)
                .properties(APPLICATION_LOCATION)
                .run(args);
    }

}
