package com.example.demo;

import java.util.List;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

/**
 * interface for certain methods
 */
public interface ScoresRepository extends DatastoreRepository<Scores, Long> {

  List<Scores> findByPlayer(String player);

  List<Scores> findByScoreGreaterThan(int score);

  List<Scores> findByPlayerAndScore(String player, int score);

  List<Scores> findByUserId(String userId);

  void deleteByUserId(String userId);

  void changePlayerHandle(String userId, String newPlayer);

}