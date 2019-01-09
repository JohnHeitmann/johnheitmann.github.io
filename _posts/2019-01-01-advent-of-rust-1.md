---
layout: post
title:  "Rust Tips from Advent of Code #1"
date:   2019-01-01 17:24:00 -0800
categories: rust
---

As somewhat of a Rust beginner, the 2018 [Advent of Code][aoc-2018] was a great chance to learn the language, both by doing the exercises solo, and then by comparing to other Rust solutions. Here are a few tips I picked up this year.

Simple Tiered Comparison
==========================

A few AoC problems were simulations that contained non-trivial ordering rules. For example, a part of [day 24][day-24] required an attacker to choose a single target from a list of targets in order of `damage to target`, with tie breaking by `power of target`, with final tie breaking by `initiative`. Also, you can't attack targets of your own `type`. Let's ignore what those quoted phrases mean and just look at the naive way I initially solved it (no need to read closely):


{% highlight rust %}
let best_target_index = None;
let best_damage = i32::MIN;
let best_power = i32::MIN;
let best_initiative = i32::MIN;
for (i, target) in targets.iter().enumerate() {
  if target.type == attacker.type {
    continue;
  }
  let damage = calculate_damage(attacker, target);
  if damage > best_damage {
    best_target_index = Some(i);
    best_damage = damage;
    best_power = target.power;
    best_initiative = target.initiative;
  } else if damage == best_damage {
    if target.power > best_power {
      // ... and so on for 2 more nested levels of pain
    }
  }
}
{% endhighlight %}

There are modest ways to golf that down while retaining the same structure. For example, maybe it's better to recalculate variables like `best_damage` to save a couple lines of code. But, there's a much better way to restructure the solution that results in fundamentally shorter and clearer code. I learned this from reading [u/m1el][m1el]'s [solution][m1el-solution]:

{% highlight rust %}
let best_target_index = targets.iter().enumerate()
    .filter(|(i, t)| t.type != attacker.type)
    .max_by_key(|(i, t)| (calculate_damage(attacker, t), t.power, t.initiative))
    .map(|(i, _)| i);
{% endhighlight %}

The lever applied here is that all Rust tuples implement Ordering if every element also implements Ordering, and [the same is true](https://doc.rust-lang.org/std/primitive.tuple.html#trait-implementations) for tuples regarding most other common traits like `Clone`, `Copy`, `Eq`, and `Hash`. The `max_by_key` line contains all you need to know about the max calculation in one line, rather than spread it out across 20 nested if statements. In the tuple ordering solution, every line except the last directly expresses a high level rule of the problem. In my original solution 90% of the lines are busywork that are a pain to write, and which obscure the rules.

 There is a small semantic difference to note. The tuple will be eagerly evaluated, while the nested conditionals will be lazily evaluated. In my example this wasn't a problem since the secondary sort keys required no computation, however in more extreme cases this may be a performance regression.

When a loop can be written with roughly the same weight of code in imperative or functional style, I tend to write in the imperative style. However, this is a clear case where the functional style wins by a mile.


[aoc-2018]: https://adventofcode.com/2018
[day-24]: https://adventofcode.com/2018/day/24
[m1el]: https://www.reddit.com/user/m1el
[m1el-solution]: https://www.reddit.com/r/adventofcode/comments/a91ysq/2018_day_24_solutions/ecfz6z3
