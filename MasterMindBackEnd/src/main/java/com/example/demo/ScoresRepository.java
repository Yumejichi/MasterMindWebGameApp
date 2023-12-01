package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;

public interface ScoresRepository extends DatastoreRepository<Scores, Long> {

  List<Scores> findByPlayer(String player);

  List<Scores> findByScoreGreaterThan(int score);

  List<Scores> findByPlayerAndScore(String player, int score);

  List<Scores> findByUserId(String userId);

  // <List<Scores>> findHighScores();
  // <List<Scores>> findTopScores();
}