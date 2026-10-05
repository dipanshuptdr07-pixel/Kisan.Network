---
name: Kisan Network backend direction
description: Current local demo scope and the intended later Supabase integration.
---

Keep Kisan Network's current sign-in and dataset in explicitly disclosed local-demo mode. The user intends to add Supabase auth and shared persistence as a later milestone; maintain the typed repository boundary without connecting to Supabase now.

**Why:** The user scoped this build to a functional demo foundation and explicitly deferred Supabase rather than asking for live service setup.

**How to apply:** When Supabase work is separately scoped, implement it behind the repository boundary and replace demo auth or persistence only in that integration. Preserve the disclosure until real authentication and SMS behavior exist.
