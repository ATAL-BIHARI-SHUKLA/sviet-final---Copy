SELECT slug, title, "isFeatured", "isActive"
FROM "Program"
WHERE "isActive" = true
ORDER BY title, slug;
