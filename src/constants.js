export const jsQuizz = {
  questions : [
    {
      "id": 0,
      "question": "______ is a linear data structure that follows the Last In First Out (LIFO) principle. Fill in the blank.",
      "type": "FIB",
      "correctAnswer": "Stack"
    },
    {
      "id": 1,
      "question": "Which data structure uses the First In First Out (FIFO) principle?",
      "choices": [
        "Stack",
        "Queue",
        "Tree",
        "Graph"
      ],
      "type": "MCQs",
      "correctAnswer": "Queue"
    },
    {
      "id": 2,
      "question": "What is the time complexity of searching for an element in a balanced binary search tree (BST)?",
      "choices": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      "type": "MCQs",
      "correctAnswer": "O(log n)"
    },
    {
      "id": 3,
      "question": "______ is used to find the shortest path in a graph. Fill in the blank.",
      "type": "FIB",
      "correctAnswer": "Dijkstra's algorithm"
    },
    {
      "id": 4,
      "question": "Which of the following sorting algorithms has the best average case time complexity?",
      "choices": [
        "Bubble Sort",
        "Merge Sort",
        "Quick Sort",
        "Insertion Sort"
      ],
      "type": "MCQs",
      "correctAnswer": "Merge Sort"
    },
    {
      "id": 5,
      "question": "What data structure is used in a depth-first search (DFS) algorithm?",
      "choices": [
        "Queue",
        "Stack",
        "Array",
        "Linked List"
      ],
      "type": "MCQs",
      "correctAnswer": "Stack"
    },
    {
      "id": 6,
      "question": "In a max-heap, the value of each node is ______ than or equal to the values of its children. Fill in the blank.",
      "type": "FIB",
      "correctAnswer": "greater"
    },
    {
      "id": 7,
      "question": "Which data structure is used for implementing recursion?",
      "choices": [
        "Queue",
        "Stack",
        "Tree",
        "Graph"
      ],
      "type": "MCQs",
      "correctAnswer": "Stack"
    },
    {
      "id": 8,
      "question": "______ is a technique for solving problems by breaking them down into smaller subproblems. Fill in the blank.",
      "type": "FIB",
      "correctAnswer": "Divide and conquer"
    },
    {
      "id": 9,
      "question": "Which algorithm is used for finding the minimum spanning tree of a graph?",
      "choices": [
        "Dijkstra's algorithm",
        "Prim's algorithm",
        "Bellman-Ford algorithm",
        "Kruskal's algorithm"
      ],
      "type": "MCQs",
      "correctAnswer": "Prim's algorithm"
    }
  ],  
};

export const resultInitialState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0
};
