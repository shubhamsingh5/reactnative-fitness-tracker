import base64 from "react-native-base64";
import { AsyncStorage } from "react-native";

export const createUser = async (
    username,
    password,
    firstName = "",
    lastName = "",
    goalDailyCalories = 0,
    goalDailyProtein = 0,
    goalDailyCarbohydrates = 0,
    goalDailyFat = 0,
    goalDailyActivity = 0
) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName,
            goalDailyCalories,
            goalDailyProtein,
            goalDailyCarbohydrates,
            goalDailyFat,
            goalDailyActivity
        })
    };
    const res = await fetch("https://mysqlcs639.cs.wisc.edu/users/", settings);
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    // console.log(await res.json());
    const loginRes = await login(username, password);
    return loginRes;
};

export const login = async (username, password) => {
    let auth = base64.encode(`${username}:${password}`);
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Basic ${auth}`
        }
    };
    // console.log(auth);
    const res = await fetch("https://mysqlcs639.cs.wisc.edu/login/", settings);
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    const token = await res.json();
    // console.log(token);

    try {
        await AsyncStorage.setItem("token", token.token);
        await AsyncStorage.setItem("username", username);
    } catch (e) {
        console.log(e);
    }
    return token;
};

export const getUser = async (token, username) => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/users/${username}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const updateUser = async (
    token,
    username,
    firstName = "",
    lastName = "",
    goalDailyCalories = 0,
    goalDailyProtein = 0,
    goalDailyCarbohydrates = 0,
    goalDailyFat = 0,
    goalDailyActivity = 0
) => {
    const settings = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            firstName,
            lastName,
            goalDailyCalories,
            goalDailyProtein,
            goalDailyCarbohydrates,
            goalDailyFat,
            goalDailyActivity
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/users/${username}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const deleteUser = async (token, username) => {
    const settings = {
        method: "DELETE",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/users/${username}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const addActivity = async (token, name, duration, date, calories) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            duration,
            date,
            calories
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/activities`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getActivities = async token => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/activities`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getActivity = async (token, id) => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/activities/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const updateActivity = async (
    token,
    id,
    name,
    duration,
    date,
    calories
) => {
    const settings = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            duration,
            date,
            calories
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/activities/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const deleteActivity = async (token, id) => {
    const settings = {
        method: "DELETE",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/activities/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const addMeal = async (token, name, date) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            date
        })
    };
    const res = await fetch(`https://mysqlcs639.cs.wisc.edu/meals`, settings);
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getMeals = async token => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(`https://mysqlcs639.cs.wisc.edu/meals`, settings);
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getMeal = async (token, id) => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const updateMeal = async (token, id, name, date) => {
    const settings = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            date
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const deleteMeal = async (token, id) => {
    const settings = {
        method: "DELETE",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${id}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getFoods = async (token, mealId) => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${mealId}/foods`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const addFood = async (
    token,
    mealId,
    name,
    calories,
    protein,
    carbohydrates,
    fat
) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            calories,
            protein,
            carbohydrates,
            fat
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${mealId}/foods`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const getFood = async (token, mealId, foodId) => {
    const settings = {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${mealId}/foods/${foodId}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const updateFood = async (
    token,
    mealId,
    foodId,
    name,
    calories,
    protein,
    carbohydrates,
    fat
) => {
    const settings = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify({
            name,
            calories,
            protein,
            carbohydrates,
            fat
        })
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${mealId}/foods/${foodId}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};

export const deleteFood = async (token, mealId, foodId) => {
    const settings = {
        method: "DELETE",
        headers: {
            "x-access-token": token
        }
    };
    const res = await fetch(
        `https://mysqlcs639.cs.wisc.edu/meals/${mealId}/${foodId}`,
        settings
    );
    if (!res.ok) {
        const err = await res.json();
        throw err.message;
    }
    return await res.json();
};
