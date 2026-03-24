#![no_std]

use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

const SCORE: Symbol = symbol_short!("SCORE");

#[contract]
pub struct LeaderboardContract;

#[contractimpl]
impl LeaderboardContract {

    // update user score
    pub fn update_score(env: Env, user: Address) {

        user.require_auth();

        let mut score: i128 = env
            .storage()
            .instance()
            .get(&(SCORE, user.clone()))
            .unwrap_or(0);

        score += 1;

        env.storage()
            .instance()
            .set(&(SCORE, user.clone()), &score);

        env.events().publish(
            (symbol_short!("score"),),
            (user, score)
        );
    }

    // get user score
    pub fn get_score(env: Env, user: Address) -> i128 {

        env.storage()
            .instance()
            .get(&(SCORE, user))
            .unwrap_or(0)
    }
}