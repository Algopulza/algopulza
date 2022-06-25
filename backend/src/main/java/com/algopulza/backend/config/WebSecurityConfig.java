package com.algopulza.backend.config;

import com.algopulza.backend.config.jwt.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.*;

@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtTokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // 암호화에 필요한 PasswordEncoder 를 Bean 등록합니다.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
           .antMatchers(
                   "/h2-console/**",
                   "/error",
                   "/swagger-resources/**",
                   "/swagger-ui/**",
                   "/v2/api-docs"
           )
           .antMatchers(HttpMethod.POST, "/api/v1/members/join") // 회원가입
           .antMatchers(HttpMethod.POST,"/api/v1/members/login") // 로그인
           .antMatchers(HttpMethod.POST,"/api/v1/members/checkId") // 아이디 중복검사
           .antMatchers(HttpMethod.PUT, "/api/v1/problems") // 문제 정보 수집
           .antMatchers(HttpMethod.GET, "/api/v1/problems") // 문제 리스트 조회
           .antMatchers(HttpMethod.GET, "/api/v1/problems/random-one") // 랜덤 문제 1개 조회
           .antMatchers(HttpMethod.GET, "/api/v1/problems/random") // 랜덤 문제 리스트 조회
        ;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf()
            .disable()
            // 에러 처리 핸들러 등록
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)
            .and()
            // 세션을 사용하지 않고 jwt 사용
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .anyRequest()
            .authenticated()
            .and()
            .apply(new JwtSecurityConfig(tokenProvider));
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("https://algopulza.day");
        configuration.addAllowedOrigin("https://ci.algopulza.day");
        configuration.addAllowedOrigin("https://api-docs.algopulza.day");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
