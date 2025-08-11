# Task 05: Log ToDo Events with EventEmitter

Extend Task 4 (Mini HTTP Server) by adding `EventEmitter` functionality. Emit and log events like `todoCreated`, `todoDeleted`, `todoUpdated`, and `todoViewed`. Create a comprehensive logging and analytics system.

## Requirements

### Core Functionality

1. **Extend Previous Server**

   - Build upon your Task 4 HTTP server
   - Add EventEmitter to the TodoServer class
   - Maintain all existing API functionality

2. **Event System**

   - Emit events for all CRUD operations
   - Create event listeners for logging
   - Support multiple listeners per event
   - Add analytics tracking

3. **Events to Implement**

   | Event             | When Triggered                     | Data Passed                                         |
   | ----------------- | ---------------------------------- | --------------------------------------------------- |
   | `todoCreated`     | POST /todos success                | `{ todo, timestamp, requestInfo }`                  |
   | `todoUpdated`     | PUT /todos/:id success             | `{ oldTodo, newTodo, timestamp, requestInfo }`      |
   | `todoDeleted`     | DELETE /todos/:id success          | `{ todo, timestamp, requestInfo }`                  |
   | `todoViewed`      | GET /todos/:id success             | `{ todo, timestamp, requestInfo }`                  |
   | `todosListed`     | GET /todos success                 | `{ todos, count, filters, timestamp, requestInfo }` |
   | `todoNotFound`    | Any operation on non-existent todo | `{ todoId, operation, timestamp, requestInfo }`     |
   | `validationError` | Invalid data submitted             | `{ errors, data, timestamp, requestInfo }`          |
   | `serverError`     | Any server error                   | `{ error, operation, timestamp, requestInfo }`      |

### Implementation Details

#### 1. Enhanced TodoServer Class

```javascript
const http = require("http");
const url = require("url");
const EventEmitter = require("events");

class TodoServer extends EventEmitter {
  constructor(port = 3000) {
    super();
    this.port = port;
    this.todos = [];
    this.nextId = 1;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Set up event listeners
    this.on("todoCreated", this.logTodoCreated.bind(this));
    this.on("todoUpdated", this.logTodoUpdated.bind(this));
    // Add more listeners
  }

  // Event handler methods
  logTodoCreated(eventData) {
    // Implementation
  }
}
```

#### 2. Request Information Structure

```javascript
const requestInfo = {
  method: req.method,
  url: req.url,
  userAgent: req.headers["user-agent"],
  ip: req.connection.remoteAddress,
  timestamp: new Date(),
};
```

#### 3. Event Data Structures

**todoCreated Event:**

```javascript
{
  todo: {
    id: 1,
    title: "New Todo",
    description: "Description",
    completed: false,
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-01T10:00:00.000Z"
  },
  timestamp: "2024-01-01T10:00:00.000Z",
  requestInfo: {
    method: "POST",
    url: "/todos",
    userAgent: "curl/7.68.0",
    ip: "127.0.0.1"
  }
}
```

**todoUpdated Event:**

```javascript
{
  oldTodo: { /* previous todo state */ },
  newTodo: { /* updated todo state */ },
  changes: ["title", "completed"], // fields that changed
  timestamp: "2024-01-01T10:00:00.000Z",
  requestInfo: { /* request details */ }
}
```

### Logging System

#### 1. Console Logger

```javascript
class ConsoleLogger {
  static logTodoCreated(data) {
    console.log(
      `📝 [${data.timestamp}] Todo Created: "${data.todo.title}" (ID: ${data.todo.id})`
    );
    console.log(
      `   └─ From: ${data.requestInfo.ip} via ${data.requestInfo.method} ${data.requestInfo.url}`
    );
  }

  static logTodoUpdated(data) {
    console.log(
      `✏️  [${data.timestamp}] Todo Updated: "${data.newTodo.title}" (ID: ${data.newTodo.id})`
    );
    console.log(`   └─ Changed fields: ${data.changes.join(", ")}`);
  }

  // Add more logging methods
}
```

#### 2. File Logger

```javascript
const fs = require("fs").promises;

class FileLogger {
  constructor(logFile = "todo-events.log") {
    this.logFile = logFile;
  }

  async logEvent(eventType, data) {
    const logEntry = {
      eventType,
      timestamp: new Date().toISOString(),
      data,
    };

    const logLine = JSON.stringify(logEntry) + "\n";
    await fs.appendFile(this.logFile, logLine);
  }
}
```

#### 3. Analytics Tracker

```javascript
class AnalyticsTracker {
  constructor() {
    this.stats = {
      totalCreated: 0,
      totalUpdated: 0,
      totalDeleted: 0,
      totalViews: 0,
      errors: 0,
      dailyStats: {},
    };
  }

  trackTodoCreated(data) {
    this.stats.totalCreated++;
    this.updateDailyStats("created");
  }

  trackTodoUpdated(data) {
    this.stats.totalUpdated++;
    this.updateDailyStats("updated");
  }

  updateDailyStats(action) {
    const today = new Date().toISOString().split("T")[0];
    if (!this.stats.dailyStats[today]) {
      this.stats.dailyStats[today] = {
        created: 0,
        updated: 0,
        deleted: 0,
        views: 0,
      };
    }
    this.stats.dailyStats[today][action]++;
  }

  getStats() {
    return { ...this.stats };
  }
}
```

### Enhanced API Endpoints

#### Add Analytics Endpoint

**GET /analytics**

```javascript
// Response
{
  "success": true,
  "data": {
    "totalCreated": 15,
    "totalUpdated": 8,
    "totalDeleted": 3,
    "totalViews": 45,
    "errors": 2,
    "dailyStats": {
      "2024-01-01": {
        "created": 5,
        "updated": 2,
        "deleted": 1,
        "views": 12
      }
    }
  }
}
```

#### Add Recent Events Endpoint

**GET /events**

```javascript
// Response (last 10 events)
{
  "success": true,
  "data": [
    {
      "eventType": "todoCreated",
      "timestamp": "2024-01-01T10:00:00.000Z",
      "data": { /* event data */ }
    }
  ]
}
```

### Event-Driven Features

#### 1. Auto-Completion Reminders

```javascript
// Emit reminder events for old incomplete todos
setInterval(() => {
  const oldTodos = this.todos.filter((todo) => {
    const daysSinceCreated =
      (Date.now() - new Date(todo.createdAt)) / (1000 * 60 * 60 * 24);
    return !todo.completed && daysSinceCreated > 7;
  });

  oldTodos.forEach((todo) => {
    this.emit("todoReminder", {
      todo,
      daysSinceCreated: Math.floor(
        (Date.now() - new Date(todo.createdAt)) / (1000 * 60 * 60 * 24)
      ),
      timestamp: new Date(),
    });
  });
}, 24 * 60 * 60 * 1000); // Check daily
```

#### 2. Backup System

```javascript
// Automatically backup todos when significant events occur
this.on("todoCreated", () => {
  if (this.todos.length % 10 === 0) {
    // Backup every 10 todos
    this.emit("backupNeeded", {
      reason: "todo_count_milestone",
      todoCount: this.todos.length,
      timestamp: new Date(),
    });
  }
});

this.on("backupNeeded", async (data) => {
  await fs.writeFile(
    `backup-${Date.now()}.json`,
    JSON.stringify(this.todos, null, 2)
  );
  console.log(`🔄 Backup created: ${data.reason}`);
});
```

### Error Event Handling

```javascript
// Emit and handle different types of errors
this.on("validationError", (data) => {
  console.error(`❌ Validation Error: ${data.errors.join(", ")}`);
  fileLogger.logEvent("validationError", data);
});

this.on("todoNotFound", (data) => {
  console.warn(`⚠️  Todo Not Found: ID ${data.todoId} in ${data.operation}`);
});

this.on("serverError", (data) => {
  console.error(`💥 Server Error in ${data.operation}:`, data.error.message);
  // Could trigger alerts, notifications, etc.
});
```

## Testing Your Implementation

### Event Testing Script

```javascript
// test-events.js
const TodoServer = require("./task-05");

async function testEvents() {
  const server = new TodoServer(3001);

  // Add test event listeners
  server.on("todoCreated", (data) => {
    console.log("✅ Event caught: todoCreated", data.todo.title);
  });

  server.on("todoUpdated", (data) => {
    console.log("✅ Event caught: todoUpdated", data.changes);
  });

  // Start server and run tests
  server.start();

  // Simulate API calls to trigger events
  // Use fetch or curl to test
}

testEvents();
```

### Load Testing

```javascript
// Create script that makes multiple concurrent requests
// to test event system under load
async function loadTest() {
  const promises = [];

  for (let i = 0; i < 100; i++) {
    promises.push(
      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Load Test Todo ${i}`,
          description: `Created during load test`,
        }),
      })
    );
  }

  await Promise.all(promises);
  console.log("Load test completed");
}
```

## Document Your Work

After completing all previous steps, you must document your work in the file `solutions/task-05.txt`:

- `task-05.js` - Enhanced server with events
- `task-05-loggers.js` - Logging classes
- `task-05-analytics.js` - Analytics tracker
- `task-05-test.js` - Event testing script
- `todo-events.log` - Log file (generated)

## Usage Example

```javascript
const TodoServer = require("./task-05");

const server = new TodoServer(3000);

// Add custom event listeners
server.on("todoCreated", (data) => {
  console.log(`New todo: ${data.todo.title}`);
});

server.on("todoCompleted", (data) => {
  console.log(`Todo completed: ${data.todo.title}`);
});

server.start();
```

## Bonus Points

- Performance metrics (response times, memory usage)
- Event sourcing pattern implementation
- Metrics dashboard endpoint

## Performance Considerations

- Avoid memory leaks with event listeners
- Handle high-frequency events efficiently
- Implement event throttling if needed
- Clean up event listeners properly
- Monitor event loop lag from heavy listeners

## Expected Output

```
[2024-01-01T10:00:00.000Z] Todo Created: "Learn Node.js" (ID: 1)
[2024-01-01T10:01:00.000Z] Todo Updated: "Learn Node.js" (ID: 1)
[2024-01-01T10:02:00.000Z] Todo Deleted: "Learn Node.js" (ID: 1)
Daily stats updated: 1 created, 1 updated, 1 deleted
```
