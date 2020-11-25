const data = [
    {
        "id": 301,
        "name": "Introduction To Java",
        "description": "Java and its basics",
        "category": {
            "id": 203,
            "name": "Backend"
        },
        "competency": {
            "id": 101,
            "name": "Beginner"
        }
    },
    {
        "id": 302,
        "name": "Introduction To Python",
        "description": "Python basics",
        "category": {
            "id": 203,
            "name": "Backend"
        },
        "competency": {
            "id": 101,
            "name": "Beginner"
        }
    },
    {
        "id": 303,
        "name": "Python Course",
        "description": "Medium level Learning",
        "category": {
            "id": 203,
            "name": "Backend"
        },
        "competency": {
            "id": 102,
            "name": "Mediocre"
        }
    },
    {
        "id": 304,
        "name": "React Course",
        "description": "Learning",
        "category": {
            "id": 201,
            "name": "UI"
        },
        "competency": {
            "id": 103,
            "name": "Advanced"
        }
    },
    {
        "id": 305,
        "name": "Full Backend",
        "description": "Full Fledged",
        "category": {
            "id": 203,
            "name": "Backend"
        },
        "competency": {
            "id": 104,
            "name": "Expert"
        }
    }
]

let cate = []
data.map(item => {
    if (!cate.includes(item.category.name)) {
        cate.push(item.category.name)
    }
})