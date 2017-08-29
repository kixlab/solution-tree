# solution-tree
Hyunsuk Shin's 2017 summer intern project 

### Purpose
Problem solving is one of good way of learning. Learner easily evaluate their acknowledgement, learning more about concept and so on. <br>
Therefore, many instructor give appropriate problem to help learner's learning. <br>
For effective problem solving, there should be evaluation, feedback or other worked example's are needed. <br>
Nowaday, there are lots of people using online learning. However, in online education, there are too many learners compare to instructor. <br>
It means, unlike classroom lecture, instructor cannot manually give feedback but need systematical help. <br>
So, currently popular problem types are short answer question, multiple choice question. Which are easily automatically graded. <br>
Some research develop tools help instructor to give feedbacks.(GradeScope[1], Overcode[2]) <br>
Some research ask learner to create evaluation or hint(peerstudio[3], [4])<br>

###Approach

Two goals
- How about gathering similar problem for giving feedback or hint to each other?
- How about showing another problem solving approach?

To gather similar problem
 1. Learner solve the problem
 2. Ask learner to summarize problem
 3. Ask learner to select similar summary in existing trees



###Setting
Django version : 1.11.3
Python version : 3.6.2
Database : SQLite
Tree rendering : <a href="http://fperucic.github.io/treant-js/">Treant.api</a>

<sub><sup>
[1]Singh, Arjun, et al. "Gradescope: A Fast, Flexible, and Fair System for Scalable Assessment of Handwritten Work." Proceedings of the Fourth (2017) ACM Conference on Learning@ Scale. ACM, 2017.
[2]Glassman, Elena L., et al. "OverCode: Visualizing variation in student solutions to programming problems at scale." ACM Transactions on Computer-Human Interaction (TOCHI) 22.2 (2015): 7.
[3]Kulkarni, Chinmay E., Michael S. Bernstein, and Scott R. Klemmer. "PeerStudio: rapid peer feedback emphasizes revision and improves performance." Proceedings of the Second (2015) ACM Conference on Learning@ Scale. ACM, 2015.
[4]Glassman, Elena L., et al. "Learnersourcing personalized hints." Proceedings of the 19th ACM Conference on Computer-Supported Cooperative Work & Social Computing. ACM, 2016.
</sup></sub>
