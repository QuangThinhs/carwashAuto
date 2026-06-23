package com.autowashpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Diem khoi chay cua AutoWash Pro REST API.
 *
 * @EnableScheduling: dung cho cac tac vu dinh ky (vd: ra soat nang/ha hang hang thang,
 * het han diem sau 12 thang).
 */
@SpringBootApplication
@EnableScheduling
public class AutoWashProApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutoWashProApplication.class, args);
    }
}
