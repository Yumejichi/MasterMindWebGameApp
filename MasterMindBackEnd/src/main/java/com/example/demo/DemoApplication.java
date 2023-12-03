package com.example.demo;

import java.util.List;

import com.google.common.collect.Lists;
import java.time.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

@ShellComponent
@SpringBootApplication
public class DemoApplication {
   @Autowired
   ScoresRepository scoreRepository;

   public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
   }

   @ShellMethod("Saves a score to Cloud Datastore: save-score <title> <player> <score>")
   public String saveScore(String user, String player, int score, String userId, Date date) {
      Scores savedScore = this.scoreRepository.save(new Scores(user, player, score, userId, date));
      return savedScore.toString();
   }

   @ShellMethod("Loads all scores")
   public String findAllScores() {
      Iterable<Scores> scores = this.scoreRepository.findAll();
      return Lists.newArrayList(scores).toString();
   }

   @ShellMethod("Loads scores by Player: find-by-Player <player>")
   public String findByPlayer(String player) {
      List<Scores> scores = this.scoreRepository.findByPlayer(player);
      return scores.toString();
   }

   @ShellMethod("Removes all scores for the userId")
   public void deleteByUserId(String userId) {
      this.scoreRepository.deleteByUserId(userId);
   }

   @ShellMethod("Loads scores by Player and score: find-by-Player-score <player> <score>")
   public String findByPlayerScore(String player, int score) {
      List<Scores> scores = this.scoreRepository.findByPlayerAndScore(player, score);
      return scores.toString();
   }

   @ShellMethod("Loads scores published after a given score: find-by-score-after <score>")
   public String findByScoreAfter(int score) {
      List<Scores> scores = this.scoreRepository.findByScoreGreaterThan(score);
      return scores.toString();
   }

   @ShellMethod("Loads scores by player: find-by-player <player>")
   public String findByUserId(String userId) {
      List<Scores> scores = this.scoreRepository.findByUserId(userId);
      return scores.toString();
   }


}
