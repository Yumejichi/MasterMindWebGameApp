package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import com.google.common.collect.Lists;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class ScoresController {
  private final ScoresRepository scoreRepository;

  public ScoresController(ScoresRepository scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  @PostMapping("/saveScore")
  @CrossOrigin(origins = "*")
  public String saveScore(@RequestBody Scores score) {
    if (score == null) {
      return "The score is invalid";
    }
    this.scoreRepository.save(score);
    return "success";
  }

  @GetMapping("/findAllScores")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findAllScores() {
    Iterable<Scores> scores = this.scoreRepository.findAll();
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }


  @GetMapping("/findByPlayer")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findByPlayer(@RequestParam String player) {
    Iterable<Scores> scores = this.scoreRepository.findByPlayer(player);
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }

  @GetMapping("/findByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Scores> findByUserId(@RequestParam String userId) {
    Iterable<Scores> scores = this.scoreRepository.findByUserId(userId);
    List<Scores> scoreList = new ArrayList<>();
    scores.forEach(scoreList::add);
    return scoreList;
  }

  @DeleteMapping("/deleteByUserId")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public ResponseEntity<String> deleteByUserId(@RequestParam String userId) {
      try {
          scoreRepository.deleteByUserId(userId);
          return ResponseEntity.ok("Scores deleted successfully for user ID: " + userId);
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("Error deleting scores for user ID: " + userId);
      }
  }



  @PutMapping("/changePlayerHandle")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public ResponseEntity<String> changePlayerHandle(
          @RequestParam String userId,
          @RequestParam String newPlayer) {
      try {
          List<Scores> scores = scoreRepository.findByUserId(userId);
          for (Scores score : scores) {
              score.setPlayer(newPlayer);
              scoreRepository.save(score);
          }
          return ResponseEntity.ok("Player handle changed successfully for user ID: " + userId);
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("Error changing player handle for user ID: " + userId);
      }
  }


}