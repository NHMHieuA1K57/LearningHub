package swp.group2.learninghub.config;

import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

public class SecurityConfig implements SecurityFilterChain {
    @Override
    public boolean matches(HttpServletRequest request) {
        return true; // allow all request
    }

    @Override
    public List<Filter> getFilters() {
        return Collections.emptyList();
    }

    public SecurityFilterChain apply(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests()
                .anyRequest().permitAll() // Allow unauthenticated access to all endpoints
                .and()
                .csrf().disable(); // Disable CSRF protection
        return http.build();
    }
}
