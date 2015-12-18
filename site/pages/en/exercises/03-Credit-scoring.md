---

layout: exercise_en
solutions:
    - credit-scoring-asynchronous.bpmn
    - credit-scoring-synchronous.bpmn

---

# Credit Scoring

## The task

*Please model the following process:*
The sales clerks in a bank can use their software frontend to receive the credit-scoring for a certain customer. This starts a process in the banking system which communicates with the agency in the background.
This process sends a scoring request to the agency right after the beginning. Then, the Agency does a first quick scoring (level 1). This will often lead to an immediate result which is then returned directly to the banking system within seconds. The banking process presents the result to the clerk sitting at the frontend.
Sometimes the scoring cannot be determined immediately and takes longer. In this case the agency informs the banking process of the delay and then starts the level 2 scoring (which can take up to a couple of minutes). After the scoring result is determined, the information is sent back to the banking process. The banking process displays a message to the clerk when he receives information about the delay to check again later. As soon as the result arrives, it can be seen at the frontend.
Please use 3 pools for your model:
-	Banking Frontend  collapsed pool (do not model details)
-	Scoring (Bank)  expanded pool (model all details)
-	Scoring (Credit protection agency)  expanded pool (model all details)

*Background*
A credit protection agency (in Germany called „Schufa“) allows customers to query a credit rating for persons via a technical interface.

## Model solution

<div id="solutions"></div>

## Training results

<div id="results"></div>

<p>
  <a href="/site/static/03-Credit-scoring.zip"><img src="img/download.png" style="width:30px;height:30px;border:0;" />Download all results of this exercise</a>
</p>