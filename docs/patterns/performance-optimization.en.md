# Performance Optimization Decision Framework

## Purpose

This document provides a **practical decision framework** for evaluating performance optimizations during development. Use this to avoid premature optimization while ensuring you apply optimizations when they matter.

## When to use

- Before implementing any performance optimization
- When reviewing code for performance improvements
- When deciding if an optimization is worth the complexity
- Monthly performance review sessions

## The Golden Rule

**Measure first, optimize second.** Don't optimize based on assumptions - use real metrics (Lighthouse, bundle analyzer, Web Vitals).

## Decision Criteria

Before implementing any optimization, ask:

1. **Is there a measurable problem?** (Lighthouse score < 90, bundle size > 500KB)
2. **Will users notice the difference?** (Is it > 100ms improvement?)
3. **What's the maintenance cost?** (Will it make code harder to understand?)
4. **Is it premature?** (Are we optimizing before having real usage data?)

## High ROI Optimizations (Usually Worth It)

### Apollo Cache Type Policies

**Apply when:**

- Entities appear in multiple queries (Task in list + detail)
- Using `refetchQueries` after mutations
- Entities have relationships

**Skip when:**

- Simple CRUD with single query per entity
- No entity relationships

**Example:**

```typescript
// ✅ Apply: Task appears in list + detail queries
cache: new InMemoryCache({
  typePolicies: {
    Task: {
      keyFields: ['id'],
    },
  },
});
```

### Optimistic Updates

**Apply when:**

- Frequent user actions (toggle, like, favorite)
- Network latency > 200ms
- Users expect instant feedback

**Skip when:**

- Critical operations (delete, payment)
- Complex mutations with side effects

**Example:**

```typescript
// ✅ Apply: Toggle task completion
optimisticResponse: {
  toggleTaskComplete: {
    ...task,
    completed: !task.completed,
  },
}
```

### Dynamic Imports (Code Splitting)

**Apply when:**

- Components > 50KB
- Routes not accessed by all users
- Heavy third-party libraries

**Skip when:**

- Small components (< 10KB)
- Above-the-fold content
- Frequently used components

## Medium ROI Optimizations (Evaluate Case-by-Case)

### Cache Persistence

**Apply when:**

- Mobile apps (offline-first)
- Users frequently return to same data
- Data changes slowly

**Skip when:**

- Real-time data
- Sensitive data
- Data changes frequently

### Next.js Image Optimization

**Apply when:**

- > 10 images per page
- Images > 100KB each
- User-generated images

**Skip when:**

- Few images (< 5 per page)
- Already optimized (SVG, WebP)
- Images from CDN

## Performance Review Checklist

Use this **monthly** or when performance issues arise:

### Initial Setup (Do Once)

- [ ] Set up bundle analyzer
- [ ] Configure Lighthouse CI
- [ ] Set up Web Vitals monitoring
- [ ] Document baseline metrics

### Apollo Client

- [ ] Review `refetchQueries` usage
- [ ] Check if Type Policies would help
- [ ] Evaluate cache persistence
- [ ] Measure mutation performance

### Next.js

- [ ] Run bundle analyzer
- [ ] Check Lighthouse score (target > 90)
- [ ] Review dynamic imports
- [ ] Verify Image component usage

## Metrics to Track

- **Bundle Size:** < 500KB (gzipped) for initial load
- **Lighthouse Score:** > 90 for Performance
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

## Red Flags (Apply Optimization Immediately)

1. Lighthouse Performance < 50
2. Bundle size > 1MB
3. Mutation latency > 1s
4. Cache hit rate < 30%
5. LCP > 4s

## When to Skip Optimizations

Skip when:

- No measurable problem exists
- Optimization adds significant complexity
- Early MVP stage
- Users won't notice (< 100ms improvement)
- Maintenance cost > performance benefit

## Quick Reference

See the detailed decision framework in: `.cursor/rules/performance-optimization.mdc`

## Links

- [Apollo Cache Configuration](https://www.apollographql.com/docs/react/caching/cache-configuration/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
