---
layout: post
title:  "Rust Tips from Advent of Code #2"
date:   2019-01-08 23:20:00 -0800
categories: rust
---

As a Rust beginner, the 2018 [Advent of Code][aoc-2018] was a great chance to learn the language, both by doing the exercises solo, and then by comparing to other Rust solutions. Here are a few tips I picked up this year.

Custom Ordering
====================

This is half tip and half complaint.

On a particular AoC problem-- being vague to avoid spoilers-- a good solution was to use a heap to track which part of a problem space was most important to search. Rust provides a [`BinaryHeap`][binary-heap] in the standard library for this purpose. However, there is not a concise general way to build custom orderings for use with the standard library. Maybe knowing this will save you a bit of frustrated searching if you run into the same issue.

Many order-sensitive operations on Rust collections support easy external comparisons with `*_by_key` and `*_by` variants. For example, [`Vec<T>::sort`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.sort) sorts using the natural [`Ordering`](https://doc.rust-lang.org/std/cmp/enum.Ordering.html) of `T`, but with [`Vec<T>::sort_by_key(key_fn)`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.sort_by_key) you can provide your own sort key in a concise closure. There are also [`Vec::binary_search_by_key`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.binary_search_by_key) and [`Iterator::max/min_by_key`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.max_by_key) that make it easy to indirectly provide custom orderings for those operations. However, there are gaps in the collections operations where `*_by_key` operations aren't supplied. In particular for this problem there's no [`BinaryHeap::push_by_key`](http://worrydream.com/404notfound), so BinaryHeap must only use the natural Ordering of a type.

Here's what a max heap looks like. Nice and simple:
{% highlight rust %}
let mut max_int_heap: BinaryHeap<i32> = BinaryHeap::new();
{% endhighlight %}

Here is what a min heap looks like. Much less simple:
{% highlight rust %}
#[derive(Eq, PartialEq)]
struct ReverseI32(i32); // The newtype idiom

impl Ord for ReverseI32 {
    fn cmp(&self, other: &ReverseI32) -> Ordering {
        self.cmp(&other).reverse() // your custom ordering here
    }
}

// PartialOrd must be implemented as well
impl PartialOrd for ReverseI32 {
    fn partial_cmp(&self, other: &ReverseI32) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl ReverseI32 {
    fn as_i32(&self) -> i32 {
        // or make the anonymous member pub and use it like `ReverseI32.0`
        self.0
    }
}

let mut min_int_heap: BinaryHeap<ReverseI32> = BinaryHeap::new();
{% endhighlight %}

Even after all that work to get a reverse ordering, you have wrapped values. The user of the BinaryHeap will have to convert upon use. For the special case of reverse, there is a utility that can clean up half of the ugliness: [std::cmp::Reverse][cmp-reverse]. It removes the need for trait impls, but still requires the BinaryHeap user to mess with wrapped values.

{% highlight rust %}
use std::cmp::Reverse;
let mut max_int_heap: BinaryHeap<Reverse<i32>> = BinaryHeap::new();
max_int_heap.push(Reverse(0));
let max = max_int_heap.pop().unwrap().0;
{% endhighlight %}

Rust collections should be extended to let the user provide Orderings external to the type. Java has a pretty nice solution for this. Hopefully these Java snippets make sense even if you've never seen the language before:

{% highlight java %}
// Construct a min heap for integers. Java uses the natural ordering
// by default.
var minIntHeap = new PriorityQueue<Integer>();

// Construct a max heap for integers by passing in a custom Ordering
var ordering = Ordering.natural().reverse();
var maxIntHeap = new PriorityQueue(1 /* not important */, ordering);
{% endhighlight %}


[aoc-2018]: https://adventofcode.com/2018
[binary-heap]: https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html
[java-priority-queue]: https://docs.oracle.com/javase/9/docs/api/java/util/PriorityQueue.html
[python-heapq]: https://www.geeksforgeeks.org/heap-queue-or-heapq-in-python
[cmp-reverse]: https://doc.rust-lang.org/std/cmp/struct.Reverse.html