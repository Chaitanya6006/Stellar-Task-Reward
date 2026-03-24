#![no_std]

use soroban_sdk::{
    contract, contractimpl, Address, Env, String
};

use soroban_sdk::token;

#[contract]
pub struct TaskContract;

#[contractimpl]
impl TaskContract {

    pub fn complete_task(env: Env, user: Address, reward: i128) {
        user.require_auth();

        let token_id = Address::from_string(
            &String::from_str(&env, "CCHD4EXBCDTIK6XPM7UJTLPKHKKFEEYEF2757XPUZLEYDWUVBKGWA5GM")
        );

        let token = token::Client::new(&env, &token_id);

        // ✅ FIX: mint instead of transfer
        token.mint(&user, &reward);
    }
}