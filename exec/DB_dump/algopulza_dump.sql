-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema algopulza
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `algopulza` ;

-- -----------------------------------------------------
-- Schema algopulza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `algopulza` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `algopulza` ;

-- -----------------------------------------------------
-- Table `algopulza`.`tier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`tier` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`tier` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `level` INT NOT NULL DEFAULT '1',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `level_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `algopulza`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`member` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`member` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'pk 값 ',
  `algopulza_id` VARCHAR(40) NOT NULL,
  `algopulza_password` VARCHAR(255) NOT NULL,
  `boj_id` VARCHAR(255) NOT NULL,
  `tier` INT NOT NULL,
  `profile_image` TEXT NULL DEFAULT NULL COMMENT '프로필 사진 파일의 경로',
  `exp` INT NOT NULL DEFAULT '0',
  `refresh_token` VARCHAR(255) NULL DEFAULT NULL,
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `algopulza_id_UNIQUE` (`algopulza_id` ASC) VISIBLE,
  INDEX `fk_member_tier_idx` (`tier` ASC) VISIBLE,
  CONSTRAINT `fk_member_tier`
    FOREIGN KEY (`tier`)
    REFERENCES `algopulza`.`tier` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 68
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `algopulza`.`login_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`login_log` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`login_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_login_log_member1_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_login_log_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `algopulza`.`member` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1074
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `algopulza`.`problem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`problem` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`problem` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
  `level` INT NOT NULL,
  `boj_id` INT NOT NULL DEFAULT '0' COMMENT '백준사이트 문제의 ID',
  `title` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL DEFAULT '',
  `solvable_flag` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '0: 불가능, 1: 가능',
  `accepted_count` INT NOT NULL DEFAULT '0',
  `average_try_count` DOUBLE NOT NULL DEFAULT '0',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `boj_id_UNIQUE` (`boj_id` ASC) VISIBLE,
  INDEX `fk_problem_tier1_idx` (`level` ASC) VISIBLE,
  CONSTRAINT `fk_problem_tier1`
    FOREIGN KEY (`level`)
    REFERENCES `algopulza`.`tier` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23195
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `algopulza`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`tag` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '태그의 ID',
  `boj_tag_id` INT NOT NULL COMMENT '백준에서 사용되는 이 태그의 ID',
  `boj_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'solvedac의 태그 ID (string)',
  `name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '태그의 이름',
  `short_name` VARCHAR(255) NULL DEFAULT '' COMMENT '태그의 짧은 이름',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `boj_tag_id_UNIQUE` (`boj_tag_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 190
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `algopulza`.`problem_has_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`problem_has_tag` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`problem_has_tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `problem_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_problem_has_tag_problem1_idx` (`problem_id` ASC) VISIBLE,
  INDEX `fk_problem_has_tag_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_problem_has_tag_problem1`
    FOREIGN KEY (`problem_id`)
    REFERENCES `algopulza`.`problem` (`id`),
  CONSTRAINT `fk_problem_has_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `algopulza`.`tag` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40997
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `algopulza`.`problem_mark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`problem_mark` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`problem_mark` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `problem_id` INT NOT NULL,
  `type_flag` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '0: 다시 풀어볼 문제',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_problem_mark_problem_idx` (`problem_id` ASC) VISIBLE,
  INDEX `fk_problem_mark_member_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_problem_mark_member`
    FOREIGN KEY (`member_id`)
    REFERENCES `algopulza`.`member` (`id`),
  CONSTRAINT `fk_problem_mark_problem`
    FOREIGN KEY (`problem_id`)
    REFERENCES `algopulza`.`problem` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 225
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `algopulza`.`solving_log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `algopulza`.`solving_log` ;

CREATE TABLE IF NOT EXISTS `algopulza`.`solving_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `problem_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '현재 문제 풀이 상태. \"solved\", \"tried\"',
  `memory` INT NOT NULL DEFAULT '0' COMMENT '문제 푸는데 쓴 메모리',
  `run_time` INT NOT NULL DEFAULT '0' COMMENT '코드 실행 시간 (ms 단위)',
  `language` VARCHAR(255) NULL DEFAULT NULL COMMENT '문제 푸는데 사용한 언어',
  `code_length` INT NOT NULL DEFAULT '0' COMMENT '코드 길이',
  `solving_time` INT NOT NULL DEFAULT '0' COMMENT '풀이에 걸린 시간 (분 단위)',
  `submit_time` DATETIME NULL DEFAULT NULL COMMENT '제출한 시각',
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '문제풀이 기록이 등록된 시간',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '문제풀이 기록이 수정된 시간',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_solving_log_problem2_idx` (`problem_id` ASC) VISIBLE,
  INDEX `fk_solving_log_member1_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_solving_log_problem2`
    FOREIGN KEY (`problem_id`)
    REFERENCES `algopulza`.`problem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solving_log_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `algopulza`.`member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 12023
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
