package swp.group2.learninghub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import swp.group2.learninghub.config.SecurityConfig;

@SpringBootApplication
public class LearningHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningHubApplication.class, args);
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
        return new SecurityConfig().apply(http);
    }
}
